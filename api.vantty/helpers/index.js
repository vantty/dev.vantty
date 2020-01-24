const nodemailer = require("nodemailer");
const JWT = require("jsonwebtoken");
const { CONFIRMATION } = require("../helpers/emailTypes");

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
exports.composeEmail = async (email, subject, html) => {
  const transporter = await nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 465,
    secure: true,
    auth: {
      user: "postmaster@mg.vantty.ca",
      pass: "a0786ff2f0af6c7bc33de732df6b9202-2dfb0afe-a4ab1b23"
    }
  });
  const message = {
    from: "admin@vantty.ca",
    to: `${email}`,
    subject: subject,
    html: html
  };
  const { response } = await transporter.sendMail(message);
  return response;
};

exports.emailType = (type, uri, token, firstName) => {
  switch (type) {
    case CONFIRMATION:
      const url = `${uri}/confirmation/${token}`;
      return {
        subject: "Email Confirmation",
        html: `Hi ${firstName}, welcome to Vantty! To confirm your email address please <a href=${url}><strong>click here.</strong></a>`
      };
    default:
      return null;
  }
};

exports.newCardObj = card => {
  const newCard = {
    stripeCardId: card.id,
    fingerPrint: card.fingerprint,
    brand: card.brand,
    expMonth: card.exp_month,
    expYear: card.exp_year,
    last4: card.last4
  };
  return newCard;
};

exports.generateEmailToken = id => {
  return JWT.sign({ user: id }, process.env.EMAIL_SECRET, {
    expiresIn: "1d"
  });
};

exports.generateLoginToken = id => {
  return JWT.sign(
    {
      iss: "vantty",
      sub: id,
      iat: Math.floor(Date.now() / 1000), // current time
      exp: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60 // current time + 1yr
    },
    process.env.JWT_SECRET
  );
};
