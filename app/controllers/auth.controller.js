const AuthService = require('../services/auth.service');
const ApiError = require('../api-error');
const SendMail = require('../nodemailer/sendMail');
const AuthController = {
  async register(req, res, next) {
    const userInfor = req.body;
    try {
      const authService = new AuthService();
      const result = await authService.register(userInfor);
      if (result.statusCode === 400) {
        return next(new ApiError(result.statusCode, result.message));
      }
      res.status(201).json({ message: 'Registration successful' });
    } catch (err) {
      console.log(err);
      return next(new ApiError(500, 'Lỗi không xác định'));
    }
  },

  async verifyEmail(req, res, next) {
    const { verificationToken } = req.query;
    console.log(verificationToken);
    try {
      const authService = new AuthService();

      const sendMailResult = await authService.verifyEmail(verificationToken);

      if (sendMailResult.statusCode === 400) {
        return next(
          new ApiError(sendMailResult.statusCode, sendMailResult.message)
        );
      }
      res.status(200).json({ message: 'Tài khoản đã được xác thực ' });
    } catch (err) {
      console.log(err);
      return next(new ApiError(500, 'Lỗi xảy ra trong quá trình xác thực'));
    }
  },
};

module.exports = AuthController;
