const User = require('../models/user');
const ApiError = require('../api-error');
const jwt = require('jsonwebtoken');
const config = require('../config/index');
const SendMail = require('../nodemailer/sendMail');
const getMailTemplate = require('../nodemailer/getMailTemplates');
class AuthService {
  async verifyEmail(verificationToken) {
    const user = await User.findOne({ verificationToken });

    if (!user) {
      throw new ApiError(400, 'Không tồn tại tài khoản này');
    }

    user.isVerified = true;
    await user.save();

    return { success: true };
  }

  async verifyRefreshToken(oldAccessToken, refreshToken) {
    const decodedToken = jwt.decode(oldAccessToken);
    if (!refreshToken) {
      throw new ApiError(401, 'Không tìm thấy refresh token');
    }
    const isVerified = jwt.verify(refreshToken, config.jwt.secret_key);
    if (isVerified) {
      const accessToken = jwt.sign(
        {
          username: decodedToken.username,
          role: decodedToken.role,
          _id: decodedToken._id,
        },
        config.jwt.secret_key,
        { expiresIn: '1h' }
      );
      return { success: true, accessToken };
    } else {
      throw new ApiError(401, 'Refresh token không hợp lệ');
    }
  }

  async verifyForgetPassword(userEmail){
    const user = await User.findOne({email: userEmail});

    if(!user){
      throw new ApiError(400, 'Không tồn tại tài khoản có email này');
    }

    const sendMail = new SendMail();
    const payload = {
      isResetPassword: true,
      username: user.username
    }
    const token = jwt.sign(payload, config.jwt.secret_key);

    const verificationLink = `http://localhost:3000/api/v1/auth/verify-forget-password?verificationToken=${token}`;

    await sendMail.sendMail(user.email, 'Quên mật khẩu',getMailTemplate.forgotPasswordTemplate(user.username, verificationLink ));

  }
}

module.exports = AuthService;
