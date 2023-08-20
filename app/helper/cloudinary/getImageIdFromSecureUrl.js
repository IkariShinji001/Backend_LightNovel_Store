const getImageIdFromSecureUrl = (secure_url) => {
    const publicId = secure_url.substring(secure_url.lastIndexOf('/') + 1, secure_url.lastIndexOf('.'));
    return publicId;
  };
  
  module.exports = getImageIdFromSecureUrl;
  