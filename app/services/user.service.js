const User = require('../models/user');
const bcrypt = require('bcrypt');
const SendMail = require('../nodemailer/sendMail');
const getMailTemplate = require('../nodemailer/getMailTemplates');
const { v4: uuidv4 } = require('uuid');
const ApiError = require('../api-error');
const jwt = require('jsonwebtoken');
const config = require('../config/index');

class UserService {
  async register(userInfor) {
    const user = await User.findOne({ username: userInfor.username });
    const email = await User.findOne({ email: userInfor.email });
    if (user) {
      return new ApiError(400, 'Tên tài khoản đã tồn tại');
    }
    if (email) {
      return new ApiError(400, 'Email đã tồn tại');
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

  async login(userInfor) {
    const { username, password } = userInfor;

    const user = await User.findOne({ username });

    if (!user) {
      return new ApiError(400, 'Không tồn tại tài khoản');
    }

    if (!user.isVerified) {
      return new ApiError(400, 'Chưa xác thực email');
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      return new ApiError(400, 'Sai mật khẩu');
    }

    const access_token = jwt.sign(
      {
        _id: user._id.toString(),
        username: user.username,
        role: user.role,
      },
      config.jwt.secret_key,
      { expiresIn: '30m' }
    );

    const refresh_token = jwt.sign(
      {
        id: uuidv4(),
      },
      config.jwt.secret_key,
      { expiresIn: '1d' }
    );

    return { access_token, refresh_token, success: true };
  }
}

module.exports = UserService;
