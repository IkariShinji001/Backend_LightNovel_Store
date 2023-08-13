const AuthService = require('../services/auth.service');
const ApiError = require('../api-error');
const SendMail = require('../nodemailer/sendMail');
const AuthController = {
  async register(req, res, next) {
    const userInfor = req.body;
    console.log(userInfor);
    try {
      const authService = new AuthService();
      const result = await authService.register(userInfor);
      if (result?.statusCode === 400) {
        return next(new ApiError(result.statusCode, result.message));
      }
      res.status(201).json({ message: 'Registration successful' });
    } catch (err) {
      console.log(err);
      return next(new ApiError(500, 'Lỗi không xác định'));
    }
  },
};

module.exports = AuthController;
