const dotenv = require('dotenv');
dotenv.config();

const config = {
  app: {
    port: process.env.PORT,
  },
  db: {
    uri: process.env.MONGODB_URI,
  },
  nodemailer: {
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  },
};

module.exports = config;
