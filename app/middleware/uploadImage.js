const fs = require('fs');
const cloudinary = require('./cloudinary');

const uploadSingleImageCoudinary = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Không tồn tại file' });
    }
    const { path } = req.file;
    const resultImageUpload = await cloudinary.uploader.upload(path);
    fs.unlinkSync(path);
    req.cloudinary_secure_url = resultImageUpload.secure_url;
    console.log(resultImageUpload.secure_url);
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Lỗi xảy ra trong quá trình upload' });
  }
};

module.exports = uploadSingleImageCoudinary;