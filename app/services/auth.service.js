const User = require('../models/user');
const bcrypt = require('bcrypt');
const SendMail = require('../nodemailer/sendMail');
const getMailTemplate = require('../nodemailer/getMailTemplates');
const { v4: uuidv4 } = require('uuid');
const ApiError = require('../api-error');

class AuthService {
  async verifyEmail(verificationToken) {
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return new ApiError(400, 'Không tồn tại tài khoản này');
    }

    user.isVerified = true;
    await user.save();

    return { success: true };
  }
}

module.exports = AuthService;
