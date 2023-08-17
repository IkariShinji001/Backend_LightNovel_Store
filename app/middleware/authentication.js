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
      res.status(401).json({ error: 'Token không hợp lệ' });
    }
  } else {
    res.status(401).json({ error: 'Không có token' });
  }
};

module.exports = authentication;
