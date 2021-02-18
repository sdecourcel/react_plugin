import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './Auth.context';

function PrivateRoute({ children, ...rest }) {
  const { token } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/connexion',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
