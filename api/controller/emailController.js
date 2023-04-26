const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
require("dotenv").config();

const sendEmail = asyncHandler(async (data, req, res) => {
  let transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: '"Ramat NoteBook" <cskh@ramatnotebook.com>', // sender address
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.htm,
  };

  await transporter.sendMail(mailOptions);
});

module.exports = sendEmail;
