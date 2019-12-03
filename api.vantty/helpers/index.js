const nodemailer = require("nodemailer");

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
exports.composeEmail = (email, subject, html) => {
  try {
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
      from: "admin@vantty.ca",
      to: `${email}`,
      subject: subject,
      html: html
    };

    transporter.sendMail(message, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent");
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

// Compose Email
// exports.composeEmail = (email, subject, html) => {
//   let users = [
//     {
//       name: "Jack",
//       email: "sebhernandezram@gmail.com"
//     }
//   ];

//   function sendEmail(obj) {
//     return transporter.sendMail(obj);
//   }

//   function loadTemplate(templateName, contexts) {
//     let template = new EmailTemplate(
//       path.join(__dirname, "templates", templateName)
//     );
//     return Promise.all(
//       contexts.map(context => {
//         return new Promise((resolve, reject) => {
//           template.render(context, (err, result) => {
//             if (err) reject(err);
//             else
//               resolve({
//                 email: result,
//                 context
//               });
//           });
//         });
//       })
//     );
//   }

//   loadTemplate("updates-april-2017", users)
//     .then(results => {
//       return Promise.all(
//         results.map(result => {
//           sendEmail({
//             to: result.context.email,
//             from: "Me :)",
//             subject: result.email.subject,
//             html: result.email.html,
//             text: result.email.text
//           });
//         })
//       );
//     })
//     .then(() => {
//       console.log("Yay!");
//     });
// };

// exports.createReviewValidator = (req, res, next) => {
//   req.check("author", "Please enter your name").notEmpty();
//   req
//     .check("body", "Please enter a review")
//     .notEmpty()
//     .isLength({ min: 5, max: 300 })
//     .withMessage("The review must be between 5 and 300 characters");

//   const errors = req.validationErrors();
//   if (errors) {
//     return res.status(400).json({ errors });
//   }

//   next();
// };
