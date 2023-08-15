const jwt = require('jsonwebtoken');
const config = require('../config/index');
const authentication = (req, res, next) => {
  const token = req.cookies.access_token;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, config.jwt.secret_key);
      req.user = decodedToken;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  } else {
    res.status(401).json({ error: 'Missing token' });
  }
};

module.exports = authentication;
