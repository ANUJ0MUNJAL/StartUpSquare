// auth.js

export const authenticateUser = () => {
    const token = localStorage.token;
    if (!token) {
      // Redirect to login page if token is not present
      window.location.href = '/login';
      return null;
    }
     console.log(token);
     const role=token.role;
  
    // Return the user information
    return {
      role: role, // Replace with the actual role from the token
      // Other user information...
    };
  };
  