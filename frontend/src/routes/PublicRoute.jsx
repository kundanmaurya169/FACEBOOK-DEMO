/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  // if user have token in there local storage
  const isAuthenticated = !!localStorage.getItem('token');  
  return !isAuthenticated ? children : <Navigate to="/feed" />;
};

export default PublicRoute;
