const UserService = require('../services/user.service');
const ApiError = require('../api-error');
const UserController = {
  async register(req, res, next) {
    const userInfor = req.body;
    try {
      const userService = new UserService();
      const result = await userService.register(userInfor);
      if (result.statusCode === 400) {
        return next(new ApiError(result.statusCode, result.message));
      }
      res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      console.log(error);
      return next(new ApiError(500, 'Lỗi không xác định'));
    }
  },

  async login(req, res, next) {
    const userInfor = req.body;
    try {
      const userService = new UserService();
      const result = await userService.login(userInfor);
      if (result.statusCode === 400) {
        return next(new ApiError(result.statusCode, result.message));
      }

      res.cookie('access_token', result.access_token, { httpOnly: true });
      res.cookie('refresh_token', result.refresh_token, { httpOnly: true });
      return res
        .status(200)
        .json({ success: true, access_token: result.access_token });
    } catch (error) {
      console.log(error);
      return next(new ApiError(500, 'Lỗi không xác định'));
    }
  },
};

module.exports = UserController;
