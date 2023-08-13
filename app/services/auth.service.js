const User = require('../models/user');
const bcrypt = require('bcrypt');
const SendMail = require('../nodemailer/sendMail');
const getMailTemplate = require('../nodemailer/getMailTemplates');
const { v4: uuidv4 } = require('uuid');
const ApiError = require('../api-error');

class AuthService {
  async register(userInfor) {
    const user = await User.findOne({ username: userInfor.username });
    if (user) {
      return new ApiError(400, 'Tên tài khoản đã tồn tại');
    }
    const hashPassword = await bcrypt.hash(userInfor.password, 10);
    const newUser = new User({
      username: userInfor.username,
      password: hashPassword,
      fullName: userInfor.fullName,
      address: userInfor.address,
      phoneNumber: userInfor.phoneNumber,
    });
    await newUser.save();
    const verificationToken = uuidv4();
    const sendMailInstance = new SendMail();
    const verificationLink = `http://localhost:3000/api/v1/auth/verify?token=${verificationToken}`;
    await sendMailInstance.sendMail(
      userInfor.email,
      'Xác thực email đăng ký tài khoản',
      getMailTemplate.vefifyTemplateMail(userInfor.username, verificationLink)
    );
  }
}

module.exports = AuthService;
