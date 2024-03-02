// authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const authMiddleware = async (req, res, next) => {
  try {
    // Check if the 'Authorization' header is present
    const authorizationHeader = req.header('Authorization');
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new Error('Invalid Authorization header');
    }
     
   
   const token = req.header('Authorization')?.replace('Bearer ', '');
console.log('Received Token:', token);

// Rest of the code...

    // Verify the token and retrieve user information
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId);
   
    if (!user) {
      throw new Error('User not found');
    }

    // Set the user information in the request
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
