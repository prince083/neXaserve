// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Provider = require('../models/provider');
const Admin = require('../models/admin');

// Verify JWT and attach user to request
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Pick model by role from token
      let user;
      if (decoded.role === 'user') {
        user = await User.findById(decoded.id).select('-password');
      } else if (decoded.role === 'provider') {
        user = await Provider.findById(decoded.id).select('-password');
      } else if (decoded.role === 'admin') {
        user = await Admin.findById(decoded.id).select('-password');
      }

      if (!user) return res.status(404).json({ message: 'User not found' });

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, token missing' });
  }
};

// Allow only certain roles (e.g. 'admin', 'provider')
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: `Access denied for role: ${req.user.role}` });
    }
    next();
  };
};

module.exports = { protect, authorizeRoles };
