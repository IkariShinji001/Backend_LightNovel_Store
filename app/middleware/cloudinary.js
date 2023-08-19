const cloudinary = require('cloudinary').v2;
const config = require('../config/index');

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
  secure: true,
});

module.exports = cloudinary;
