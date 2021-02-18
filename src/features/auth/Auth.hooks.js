import * as React from 'react';
import { getClient } from 'graphql/client';

export const TOKEN_KEY = 'ECOV_USER_TOKEN';

export const useAuthService = () => {
  // const [restored, setRestored] = React.useState(false);
  const [token, setToken] = React.useState(
    JSON.parse(window.localStorage.getItem(TOKEN_KEY)) || null,
  );

  const login = React.useCallback(async (newToken) => {
    setToken(newToken);
    window.localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
  }, []);

  const logout = React.useCallback(async () => {
    setToken(null);
    getClient().resetStore();
    window.localStorage.removeItem(TOKEN_KEY);
  }, []);

  return {
    // restored,
    token,
    login,
    logout,
  };
};
