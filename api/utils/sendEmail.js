import nodemailer from 'nodemailer'
import { config } from "dotenv";
config();

export default () => {
  const Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  return {
    text_attachments: function(to_who, subject, message="Hello!", filename=null, path=null){
      const mailOptions = {
        from: 'raymand0109@gmail.com',
        to: to_who,
        subject: subject,
        text: message,
        attachments: [
          {
            filename: filename,
            path: path  // 替換為您的文件路徑
          }
        ]
      };
      Transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.error('Error sending email: ' + error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    },
    html: function(to_who, subject, body){
      const mailOptions = {
        from: 'raymand0109@gmail.com',
        to: to_who,
        subject: subject,
        html: body,
      };
      Transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.error('Error sending email: ' + error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }
  }
}