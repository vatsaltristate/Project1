const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "9046bf8df1f437",
    pass: "0a7b7bd27dd355",
  },
});

const sendWelcomeEmail = (email, name) => {
  transport.sendMail(
    {
      from: '"Example Team" <vatsal@example.com>',
      to: `${email}`,
      subject: "Nice Nodemailer test",
      text: `Hey there, its our first message sent with Nodemailer, welcome onboard ${name}!`,
      html: `<b>Welcome Node Team ${name}! </b>`,
    },
    (err, info) => {
      if (err) {
        return console.log(err);
      }
      console.log("Message sent: %s", info.messageId);
    }
  );
};

module.exports = { sendWelcomeEmail };

