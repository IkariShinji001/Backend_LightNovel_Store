const nodemailer = require('nodemailer');
const config = require('../config/index');

class SendMail {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: config.nodemailer.service,
      auth: {
        user: config.nodemailer.auth.user,
        pass: config.nodemailer.auth.pass,
      },
    });
  }

  async sendMail(to, subject, template) {
    const mailOptions = {
      from: config.nodemailer.auth.user,
      to,
      subject,
      html: template,
    };
    await this.transporter.sendMail(mailOptions);
  }
}

module.exports = SendMail;
