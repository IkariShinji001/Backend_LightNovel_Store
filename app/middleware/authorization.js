class Authorization {
  static admin(req, res, next) {
    if (req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ error: 'Bạn không có quyền truy cập' });
    }
  }

  static employee(req, res, next) {
    if (req.user.role === 'employee') {
      next();
    } else {
      res.status(403).json({ error: 'Bạn không có quyền truy cập' });
    }
  }
}

module.exports = Authorization;
