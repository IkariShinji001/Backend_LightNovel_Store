const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
  adminID: {
    type: String,
    unique: true,
  },
  password: String,
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
