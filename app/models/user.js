const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isVerified: { type: Boolean, default: false },
  fullName: String,
  email: String,
  address: String,
  phoneNumber: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
