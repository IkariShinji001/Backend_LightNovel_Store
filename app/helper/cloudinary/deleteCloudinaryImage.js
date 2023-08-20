const cloudinary = require('../../middleware/cloudinary');


const deleteCloudinaryImage = async (publicId) => {
  await cloudinary.uploader.destroy(publicId);
};

module.exports = deleteCloudinaryImage;
