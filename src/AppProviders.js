import * as React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { getClient } from 'graphql/client';
import { AuthProvider } from 'features/auth/Auth.context';
import { Theme, Colors } from 'assets/style/Theme';

function AppProviders({ children }) {
  const client = getClient();

  const theme = {
    ...Theme,
    colors: {
      ...Colors,
    },
  };

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <AuthProvider>{children}</AuthProvider>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export { AppProviders };
