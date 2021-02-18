import * as React from 'react';
import { useAuthService } from './Auth.hooks';

const AuthContext = React.createContext({});

const AuthProvider = (props) => {
  const state = useAuthService();

  const value = { ...state };
  return <AuthContext.Provider value={value} {...props} />;
};

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
