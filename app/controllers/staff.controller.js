const StaffService = require('../services/staff.service');
const ApiError = require('../api-error');

const staffController = {
  async registerNewStaff(req, res, next) {
    const staffInfor = req.body;
    try {
      const staffService = new StaffService();
      const result = await staffService.registerNewStaff(staffInfor);
      if (result.success) {
        return res.status(201).json({
          message: 'Tạo nhân viên mới thành công',
          newStaff: result.newStaff,
        });
      }
    } catch (error) {
      if (error instanceof ApiError) {
        return next(new ApiError(error.statusCode, error.result));
      }
      console.log(error);
      return next(new ApiError(500, 'Lỗi xảy ra trong quá trình tạo mới'));
    }
  },

  async login(req, res, next) {
    const { staffID, password } = req.body;

    const staffService = new StaffService();
    const result = await staffService.login(staffID, password);
    if (result.statusCode === 400) {
      return next(new ApiError(result.statusCode, result.message));
    }
    if (result.success) {
      res.cookie('access_token', result.access_token, { httpOnly: true });
      res.cookie('refresh_token', result.refresh_token, { httpOnly: true });
    }
    return res.status(200).json({ message: 'Đăng nhập thành công' });
  },
};

module.exports = staffController;
