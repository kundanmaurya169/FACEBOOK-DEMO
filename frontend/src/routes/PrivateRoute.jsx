/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const auth = localStorage.getItem('token')
  console.log("auth value :- ", auth);
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
