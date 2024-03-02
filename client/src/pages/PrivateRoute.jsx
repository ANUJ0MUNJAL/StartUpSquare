
  // PrivateRoute.js
  
  import React from 'react';
  import { Route , redirect} from 'react-router-dom';
  import { authenticateUser } from './auth';
  
 export const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => {
    const user = authenticateUser();
  
    if (!user || !allowedRoles.includes(user.role)) {
      // Redirect to login if user is not authenticated or role is not allowed
      return <redirect to="/login" />;
    }
  
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  };
  
 
  