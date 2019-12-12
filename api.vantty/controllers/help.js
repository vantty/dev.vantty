const nodemailer = require("nodemailer");

exports.sendEmail = async (req, res) => {
  try {
    // console.log("BODY", req.body);
    const transporter = nodemailer.createTransport({
      host: "smtp.mailgun.org",
      port: 465,
      secure: true,
      auth: {
        user: "postmaster@mg.vantty.ca",
        pass: "a0786ff2f0af6c7bc33de732df6b9202-2dfb0afe-a4ab1b23"
      }
    });

    let message = {
      from: `${req.body.email}`,
      to: "sebhernandezram@gmail.com",
      subject: `${req.body.issue}`,
      html: `${req.body.text}`
    };

    transporter.sendMail(message, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent");
        return res.status(200).json(data);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};
