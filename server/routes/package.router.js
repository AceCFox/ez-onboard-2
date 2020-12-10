const express = require("express");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const crypto = require ('crypto');

const nodemailer = require('nodemailer');
const creds = {
    USER: process.env.USER_EMAIL,
    PASS: process.env.PASS,
}

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
  secure: true,
  auth: {
         user: creds.USER,
         pass: creds.PASS
     }
 })

transporter.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/send', rejectUnauthenticated, (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    const message = req.body.message
    const content = `New onboarding package from ZEF EZ Onboarding app: ${message}`
  
    const mail = {
      from: creds.user,
      to: email,  //Change to email address that you want to receive messages on
      subject: 'New ZEF EZ Onboard package',
      text: content
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
  })


  //password recovery route sends a recovery link to a user's email
  router.post('/recovery', (req, res) => {
    const email = req.body.email
    const token = crypto. randomBytes(20).toString('hex')
    console.log(token);

  
    const mail = {
      from: creds.user,
      to: email,  
      subject: 'Link To Reset ZEF Password',
      text: 'You are receiving this because you (or someone else)have requestied the reset of your password for your ZEF onboarding account. \n \n'
        + 'please click on the following link, or paste this into your browser to complete the process within one hour of receiving it: \n\n'
        + `http://localhost:3000/reset/${token}\n\n`
        + `If you did not request this, please ignore this email and your password will remain unchanged. \n`,
    };
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
  })

  module.exports = router;