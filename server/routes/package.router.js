// const express = require("express");
// const router = express.Router();
// const {
//   rejectUnauthenticated,
// } = require("../modules/authentication-middleware");

// const nodemailer = require('nodemailer');
// const creds = {USER:process.env.USER_EMAIL, PASS:process.env.PASS}

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//          user: creds.USER,
//          pass: creds.PASS
//      }
//  })

// transporter.verify((error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Server is ready to take messages');
//   }
// });

// router.post('/send', rejectUnauthenticated, (req, res, next) => {
//     const name = req.body.name
//     const email = req.body.email
//     const message = req.body.message
//     const content = `New onboarding package from ZEF EZ Onboarding app: ${message}`
  
//     const mail = {
//       from: name,
//       to: email,  //Change to email address that you want to receive messages on
//       subject: 'New ZEF EZ Onboard package',
//       text: content
//     }
  
//     transporter.sendMail(mail, (err, data) => {
//       if (err) {
//         res.json({
//           msg: 'fail'
//         })
//       } else {
//         res.json({
//           msg: 'success'
//         })
//       }
//     })
//   })

//   module.exports = router;