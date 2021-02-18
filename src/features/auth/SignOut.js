// import * as React from 'react';
import { useAuth } from './Auth.context';

function SignOut({ children }) {
  const { logout } = useAuth();
  logout();
  return (window.location = '/');
}

export default SignOut;
