const authorizationAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    next();
  } else {
    res.json({ error: 'Unauthorization' });
  }
};

module.exports = authorizationAdmin;
