import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
  // Check if the user is authenticated (e.g., if a token exists in localStorage)
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" /> // Redirect to sign-in page if not authenticated
      }
    />
  );
}

export default PrivateRoute;
