const User = require('../models/user');
const ApiError = require('../api-error');
const jwt = require('jsonwebtoken');
const congfig = require('../config/index');
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

  async verifyRefreshToken(oldAccessToken, refreshToken) {
    const decodedToken = jwt.decode(oldAccessToken);
    if (!refreshToken) {
      return new ApiError(401, 'Không tìm thấy refresh token');
    }
    const isVerified = jwt.verify(refreshToken, congfig.jwt.secret_key);
    if (isVerified) {
      const accessToken = jwt.sign(
        {
          username: decodedToken.username,
          role: decodedToken.role,
          _id: decodedToken._id,
        },
        congfig.jwt.secret_key,
        { expiresIn: '1h' }
      );
      return { success: true, accessToken };
    } else {
      return new ApiError(401, 'Refresh token không hợp lệ');
    }
  }
}

module.exports = AuthService;
