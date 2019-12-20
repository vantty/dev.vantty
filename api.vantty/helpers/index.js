const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const log = console.log;

exports.validator = (req, res, next) => {
  req.check("firstName", "Please enter your first name").notEmpty();
  req.check("lastName", "Please enter your last name").notEmpty();
  req
    .check("email", "Please enter your email in format: yourname@example.com")
    .isEmail();
  req
    .check("password", "Please enter your password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must contain at leats 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain at least a number");
  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({ errors });
  }
  next();
};

exports.profileValidator = (req, res, next) => {
  // req.check("profession", "Profession is required").notEmpty();
  // req.check("profilePicture", "Picture is required").notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({ errors });
  }
  next();
};

exports.profileValidatorEducation = (req, res, next) => {
  // req.check("school", "School is required").notEmpty();
  // req.check("degree", "Degree is required").notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({ errors });
  }
  next();
};

exports.reviewValidator = (req, res, next) => {
  req.check("text", "Text is required").notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({ errors });
  }
  next();
};

exports.profileValidatorPortfolio = (req, res, next) => {
  req.check("img", "Imagen is required").notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({ errors });
  }
  next();
};

// Compose and send email
// exports.composeEmail = (email, subject, html) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.mailgun.org",
//       port: 465,
//       secure: true,
//       auth: {
//         user: "postmaster@mg.vantty.ca",
//         pass: "a0786ff2f0af6c7bc33de732df6b9202-2dfb0afe-a4ab1b23"
//       }
//     });

//     let message = {
//       from: "admin@vantty.ca",
//       to: `${email}`,
//       subject: subject,
//       html: html
//     };

//     transporter.sendMail(message, (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("Email sent");
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Server error");
//   }
// };

// Email Template
exports.composeEmail = (email, subject, html) => {
  try {
    // Step 1
    const transporter = nodemailer.createTransport({
      host: "smtp.mailgun.org",
      port: 465,
      secure: true,
      auth: {
        user: "postmaster@mg.vantty.ca",
        pass: "a0786ff2f0af6c7bc33de732df6b9202-2dfb0afe-a4ab1b23"
      }
    });

    // Step 2
    transporter.use(
      "compile",
      hbs({
        viewEngine: {
          extName: ".hbs",
          partialsDir: "./views",
          layoutsDir: "./views",
          defaultLayout: "index.hbs"
        },
        viewPath: "./views",
        extName: ".hbs"
      })
    );

    // Step 3
    let mailOptions = {
      from: "admin@vantty.ca", // TODO: email sender
      to: `${email}`, // TODO: email receiver
      subject: "Nodemailer - Test",
      text: "Wooohooo it works!!",
      template: "index",
      context: {
        subject: subject,
        html: html
      }
    };

    // Step 4
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        log("EMAIL ERROR", err);
        return log("Error occurs");
      }
      return log("Email sent!!!");
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};
