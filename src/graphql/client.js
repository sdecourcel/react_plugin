import ApolloClient from 'apollo-boost';
import { TOKEN_KEY } from 'features/auth/Auth.hooks';

let client = null;

export function getClient() {
  if (client === null) {
    client = new ApolloClient({
      uri: `${process.env.REACT_APP_API_BASE}/graphql`,
      request: async (operation) => {
        const token = JSON.parse(localStorage.getItem(TOKEN_KEY));

        operation.setContext({
          headers: {
            authorization: `Bearer ${token}`,
            'X-Brand': 'NFcZwKiipFH4Hi1w4W9u6E9u', //window.ECOV_BRAND_TOKEN,
          },
        });
      },
      onError: (err) => {
        console.log(err);
      },
    });
  }

  return client;
}
