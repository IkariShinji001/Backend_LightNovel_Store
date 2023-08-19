const Staff = require('../models/staff');
const ApiError = require('../api-error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/index');
const { v4: uuidv4 } = require('uuid');

class StaffService {
  async login(staffID, password) {
    const staff = await Staff.findOne({ staffID });

    if (!staff) {
      throw new ApiError(400, 'Tài khoản không tồn tại');
    }

    const isMatchPassword = await bcrypt.compare(password, staff.password);

    if (!isMatchPassword) {
      throw new ApiError(400, 'Mật khẩu không đúng');
    }

    const access_token = jwt.sign(
      {
        staffID: staffID,
        role: staff.role,
        _id: staff._id.toString(),
      },
      config.jwt.secret_key,
      { expiresIn: '30m' }
    );

    const refresh_token = jwt.sign({ id: uuidv4() }, config.jwt.secret_key, {
      expiresIn: '1d',
    });

    return { success: true, access_token, refresh_token };
  }

  async registerNewStaff(staffInfor) {
    const isStaffExisted = await Staff.findOne({ staffID: staffInfor.staffID });
    if (isStaffExisted) {
      throw new ApiError(400, 'Đã tồn tại nhân viên này');
    }
    staffInfor.password = await bcrypt.hash(staffInfor.password, 10);
    const newStaff = new Staff(staffInfor);
    await newStaff.save();
    return { success: true, newStaff };
  }
}

module.exports = StaffService;
