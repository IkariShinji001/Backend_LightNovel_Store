const emailTemplates = {
  vefifyTemplateMail(username, verificationLink) {
    const html = `
          <!DOCTYPE html>
          <html ⚡4email>
              <head>
                  <meta charset="utf-8">
                  <style amp4email-boilerplate>body{visibility:hidden}
                  *{
                      font-family: sans-serif;
                  }
                  .wrapper-email{
                      margin: 0 20%;
                  }
                  .wrapper-header{
                      margin: 0 auto;
                  }
                  #confirm-img{
                      width: 40%;
                      margin: 0 30%;
                  }
                  h1{
                      text-align: center;
                  }
                  h2{
                      font-size: 20px;
                  }
                  .body-email{
                      margin: 0 20%;
                  }
                  p{
                      text-align: left;
                      line-height: 2;
                  }
                  .icon{
                      font-size: 30px;   
                      transform: rotate(90deg)
                  }
                  .star{
                      color: rgb(206, 206, 87);
                  }
                  .btn-wrapper{
                      display: flex;
                      justify-content: center;
                      margin-top: 20px;
                  }
                  .btn{
                      padding: 20px 40px;
                      cursor: pointer;
                      background-color: rgba(8, 8, 162, 0.953);
                      color: white;
                      border: none;
                      outline: none;
                      font-size: 20px;
                      border-radius: 5px;
                  }
                  .btn:hover{
                      background-color: rgb(44, 44, 234);
                  }
                  .email-signature {
                                font-family: Arial, sans-serif;
                                font-size: 14px;
                                color: #333333;
                                margin-top: 20px;
                              }
          
                              .signature-name {
                                font-weight: bold;
                              }
          
                              .signature-title {
                                color: #999999;
                              }
              </style>
              </head>
              <body>
              <div class="wrapper-email">
                  <div class="wrapper-header">
                      <img id="confirm-img" src="https://img.freepik.com/premium-vector/opened-envelope-document-with-green-check-mark-line-icon-official-confirmation-message-mail-sent-successfully-email-delivery-verification-email-flat-design-vector_662353-720.jpg?w=2000" />
                  </div>
                  <div class="body-email">
                     <h1> <span class="star">&#9885;</span> Verify your email <span class="star">&#9885;</span></h1>
                     <h2>Xin chào ${username},</h2>
                     <div class="wrapper-content">
                          <p class="content"> Chúng tôi cần xác thực email của bạn,
                          click vào nút bên dưới để hoàn thành việc đăng ký tài khoản: 
                          </p>          
                     </div>
                     <div class="btn-wrapper">
                      <a href=${verificationLink}>
                          <button class="btn">
                              Verify your email
                          </button>
                      </a>  
                     </div>
                     <div class="email-signature">
                      <p class="signature-name">Thanh Duy</p>
                      <p class="signature-title">Quản lí cấp cao - Thanh Duy Luxury</p>
                      </div>
                  </div>
              </div>
          </body>
      </html>   
       `;
    return html;
  },
  forgotPasswordTemplate(username, verificationLink) {
    const html = `
          <!DOCTYPE html>
          <html ⚡4email>
              <head>
                  <meta charset="utf-8">
                  <style amp4email-boilerplate>body{visibility:hidden}
                  *{
                      font-family: sans-serif;
                  }
                  .wrapper-email{
                      margin: 0 20%;
                  }
                  .wrapper-header{
                      margin: 0 auto;
                  }
                  #confirm-img{
                      width: 40%;
                      margin: 0 30%;
                  }
                  h1{
                      text-align: center;
                  }
                  h2{
                      font-size: 20px;
                  }
                  .body-email{
                      margin: 0 20%;
                  }
                  p{
                      text-align: left;
                      line-height: 2;
                  }
                  .icon{
                      font-size: 30px;   
                      transform: rotate(90deg)
                  }
                  .star{
                      color: rgb(206, 206, 87);
                  }
                  .btn-wrapper{
                      display: flex;
                      justify-content: center;
                      margin-top: 20px;
                  }
                  .btn{
                      padding: 20px 40px;
                      cursor: pointer;
                      background-color: rgba(8, 8, 162, 0.953);
                      color: white;
                      border: none;
                      outline: none;
                      font-size: 20px;
                      border-radius: 5px;
                  }
                  .btn:hover{
                      background-color: rgb(44, 44, 234);
                  }
                  .email-signature {
                                font-family: Arial, sans-serif;
                                font-size: 14px;
                                color: #333333;
                                margin-top: 20px;
                              }
          
                              .signature-name {
                                font-weight: bold;
                              }
          
                              .signature-title {
                                color: #999999;
                              }
              </style>
              </head>
              <body>
              <div class="wrapper-email">
                  <div class="wrapper-header">
                      <img id="confirm-img" src="https://img.freepik.com/premium-vector/opened-envelope-document-with-green-check-mark-line-icon-official-confirmation-message-mail-sent-successfully-email-delivery-verification-email-flat-design-vector_662353-720.jpg?w=2000" />
                  </div>
                  <div class="body-email">
                     <h1> <span class="star">&#9885;</span>Quên mật khẩu!<span class="star">&#9885;</span></h1>
                     <h2>Xin chào ${username},</h2>
                     <div class="wrapper-content">
                          <p class="content">Bạn đã quên mật khẩu của mình, nhấn vào nút bên dưới để
                          tiến hành đổi lại mật khẩu 
                          </p>          
                     </div>
                     <div class="btn-wrapper">
                      <a href=${verificationLink}>
                          <button class="btn">
                              Verify your email
                          </button>
                      </a>  
                     </div>
                     <div class="email-signature">
                      <p class="signature-name">Thanh Duy</p>
                      <p class="signature-title">Quản lí cấp cao - Thanh Duy Luxury</p>
                      </div>
                  </div>
              </div>
          </body>
      </html>   
       `;
    return html;
  },
  verifyTestDriveBooking(username, phoneNumber, date, carName, carModel) {
    const html = `
          <!DOCTYPE html>
          <html ⚡4email>
              <head>
                  <meta charset="utf-8">
                  <style amp4email-boilerplate>body{visibility:hidden}
                  *{
                      font-family: sans-serif;
                  }
                  .wrapper-email{
                      margin: 0 20%;
                  }
                  .wrapper-header{
                      margin: 0 auto;
                  }
                  #confirm-img{
                      width: 40%;
                      margin: 0 30%;
                  }
                  h1{
                      text-align: center;
                  }
                  h2{
                      font-size: 20px;
                  }
                  .body-email{
                      margin: 0 20%;
                  }
                  p{
                      text-align: left;
                      line-height: 2;
                  }
                  .icon{
                      font-size: 30px;   
                      transform: rotate(90deg)
                  }
                  .star{
                      color: rgb(206, 206, 87);
                  }
                  .btn-wrapper{
                      display: flex;
                      justify-content: center;
                      margin-top: 20px;
                  }
                  .btn{
                      padding: 20px 40px;
                      cursor: pointer;
                      background-color: rgba(8, 8, 162, 0.953);
                      color: white;
                      border: none;
                      outline: none;
                      font-size: 20px;
                      border-radius: 5px;
                  }
                  .btn:hover{
                      background-color: rgb(44, 44, 234);
                  }
                  .email-signature {
                                font-family: Arial, sans-serif;
                                font-size: 14px;
                                color: #333333;
                                margin-top: 20px;
                              }
          
                              .signature-name {
                                font-weight: bold;
                              }
          
                              .signature-title {
                                color: #999999;
                              }
              </style>
              </head>
              <body>
              <div class="wrapper-email">
                  <div class="wrapper-header">
                      <img id="confirm-img" src="https://img.freepik.com/premium-vector/opened-envelope-document-with-green-check-mark-line-icon-official-confirmation-message-mail-sent-successfully-email-delivery-verification-email-flat-design-vector_662353-720.jpg?w=2000" />
                  </div>
                  <div class="body-email">
                     <h1> <span class="star">&#9885;</span>Đăng ký lái thử thành công<span class="star">&#9885;</span></h1>
                     <h2>Xin chào ${username},</h2>
                     <div class="wrapper-content">
                          <p class="content">Bạn đã đăng ký lái thẻ xe ${carName} ${carModel} vào ngày ${date}. Vui lòng đến đường 3/2, Quận Ninh Kiều, Thành Phố Cần Thơ
                          đúng thời gian đã đặt lịch. Xin cảm ơn</p>          
                     </div>
                     <div class="email-signature">
                      <p class="signature-name">Thanh Duy</p>
                      <p class="signature-title">Quản lí cấp cao - Thanh Duy Luxury</p>
                      </div>
                  </div>
              </div>
          </body>
      </html>   
       `;
    return html;
  },
};

module.exports = emailTemplates;
