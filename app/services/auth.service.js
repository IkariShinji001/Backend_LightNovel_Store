const User = require('../models/user');
const bcrypt = require('bcrypt');
const SendMail = require('../nodemailer/sendMail');
const getMailTemplate = require('../nodemailer/getMailTemplates');
const { v4: uuidv4 } = require('uuid');
const ApiError = require('../api-error');

class AuthService {
  async register(userInfor) {
    const user = await User.findOne({ username: userInfor.username });
    const email = await User.findOne({ email: userInfor.email });
    if (user || email) {
      return new ApiError(400, 'Tên tài kkhoản hoặc email đã tồn tại');
    }
    // Tạo token để verify email
    const verificationToken = uuidv4();
    const hashPassword = await bcrypt.hash(userInfor.password, 10);
    const newUser = new User({
      username: userInfor.username,
      password: hashPassword,
      fullName: userInfor.fullName,
      address: userInfor.address,
      phoneNumber: userInfor.phoneNumber,
      email: userInfor.email,
      verificationToken,
    });
    await newUser.save();
    // Gửi mail để người dùng xác thực
    const sendMailInstance = new SendMail();
    const verificationLink = `http://localhost:3000/api/v1/auth/verify-email?verificationToken=${verificationToken}`;
    await sendMailInstance.sendMail(
      userInfor.email,
      'Xác thực email đăng ký tài khoản',
      getMailTemplate.vefifyTemplateMail(userInfor.username, verificationLink)
    );

    return { success: true };
  }

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
