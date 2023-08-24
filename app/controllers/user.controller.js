const UserService = require('../services/user.service');
const ApiError = require('../api-error');
const UserController = {
  async register(req, res, next) {
    const userInfor = req.body;
    try {
      const userService = new UserService();
      const result = await userService.register(userInfor);
      res.status(201).json({ message: 'Đăng ký thành công' });
    } catch (error) {
      if (error instanceof ApiError) {
        return next(new ApiError(error.statusCode, error.message));
      }
      console.log(error);
      return next(new ApiError(500, 'Lỗi không xác định'));
    }
  },

  async login(req, res, next) {
    const userInfor = req.body;
    try {
      const userService = new UserService();
      const result = await userService.login(userInfor);
      res.cookie('access_token', result.access_token, { httpOnly: true });
      res.cookie('refresh_token', result.refresh_token, { httpOnly: true });
      return res
        .status(200)
        .json({ success: true, access_token: result.access_token });
    } catch (error) {
      if (error instanceof ApiError) {
        return next(new ApiError(error.statusCode, error.message));
      }
      return next(new ApiError(500, 'Lỗi không xác định'));
    }
  },

  async changePassword(req, res, next) {
    const { username } = req.user;
    const { oldPassword, newPassword } = req.body;
    try {
      const userService = new UserService();
      await userService.changePassword(oldPassword, newPassword, username);
      return res.status(200).json({ message: 'Đã đổi mật khẩu thành công' });
    } catch (error) {
      if (error instanceof ApiError) {
        return next(new ApiError(error.statusCode, error.message));
      }
      console.log(error);
      return next(new ApiError(500, 'Lỗi không xác định'));
    }
  },

  async getAllUsers(req, res, next) {
    try {
      const userService = new UserService();
      const users = await userService.getAllUser();
      return res.status(200).json(users);
    } catch (error) {
      if (error instanceof ApiError) {
        return next(new ApiError(error.statusCode, error.message));
      }
      return next(new ApiError(500, 'Lỗi không xác định'));
    }
  },
};

module.exports = UserController;
