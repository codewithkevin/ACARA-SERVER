const nodemailer = require("nodemailer");



let mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

let details = {
  from: process.env.EMAIL,
  to: "email@gmail.com",
  subject: "Account Created",
  text: "Welcome to goal App",
};

mailTransport.sendMail(details, (err) => {
  if (err) {
    console.log(err);
  }
  if (!err) {
    console.log("Sucessfully sent mail");
  }
});
