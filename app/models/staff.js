const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
  adminID: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  fullName: String,
  role: {
    type: String,
    enum: ['Manager', 'Employee'],
    default: 'Employee',
  },
  address: String,
  phoneNumber: String,
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
