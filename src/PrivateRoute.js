import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem('login');
  return isLoggedIn ? element : <Navigate to="/" />
};

export default PrivateRoute;
