const dotenv = require('dotenv');
dotenv.config();

const config = {
  app: {
    port: process.env.PORT,
    base_api: process.env.BASE_API,
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
  jwt: {
    secret_key: process.env.JWT_SECRET_KEY,
  },
};

module.exports = config;
