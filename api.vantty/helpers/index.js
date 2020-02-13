const JWT = require("jsonwebtoken");
const {
  REQUESTED_USER,
  REQUESTED_ARTIST,
  ACCEPTED_USER,
  ACCEPTED_ARTIST,
  DECLINED_USER,
  DECLINED_ARTIST,
  DECLINED_POSPONED_USER,
  DECLINED_POSPONED_ARTIST,
  DECLINED_USER_BY_USER,
  DECLINED_ARTIST_BY_USER,
  COMPLETED_USER,
  COMPLETED_ARTIST
} = require("../helpers/emailTypes");

const validator = (req, res, next) => {
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

const profileValidator = (req, res, next) => {
  // req.check("profession", "Profession is required").notEmpty();
  // req.check("profilePicture", "Picture is required").notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({ errors });
  }
  next();
};

const profileValidatorEducation = (req, res, next) => {
  // req.check("school", "School is required").notEmpty();
  // req.check("degree", "Degree is required").notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({ errors });
  }
  next();
};

const reviewValidator = (req, res, next) => {
  req.check("text", "Text is required").notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({ errors });
  }
  next();
};

const profileValidatorPortfolio = (req, res, next) => {
  req.check("img", "Imagen is required").notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({ errors });
  }
  next();
};

const newCardObj = card => {
  return {
    stripeCardId: card.id,
    fingerPrint: card.fingerprint,
    brand: card.brand,
    expMonth: card.exp_month,
    expYear: card.exp_year,
    last4: card.last4
  };
};

const profileImageObject = async newImages => {
  const profileImage = {
    original: newImages[0].eager[0].url,
    cloudId: newImages[0].public_id
  };
  return profileImage;
};

const generateEmailToken = id => {
  return JWT.sign({ user: id }, process.env.EMAIL_SECRET, {
    expiresIn: "1d"
  });
};

const generateLoginToken = id => {
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

const emailType = state => {
  switch (state) {
    case "requested":
      return {
        user: REQUESTED_USER,
        artist: REQUESTED_ARTIST
      };
    case "accepted":
      return {
        user: ACCEPTED_USER,
        artist: ACCEPTED_ARTIST
      };
    case "declined":
      return {
        user: DECLINED_USER,
        artist: DECLINED_ARTIST
      };
    case "declined-posponed":
      return {
        user: DECLINED_POSPONED_USER,
        artist: DECLINED_POSPONED_ARTIST
      };
    case "declined-user":
      return {
        user: DECLINED_USER_BY_USER,
        artist: DECLINED_ARTIST_BY_USER
      };
    case "completed":
      return {
        user: COMPLETED_USER,
        artist: COMPLETED_ARTIST
      };
    default:
      return null;
  }
};

module.exports = {
  validator,
  profileValidator,
  profileValidatorEducation,
  reviewValidator,
  profileValidatorPortfolio,
  newCardObj,
  profileImageObject,
  generateEmailToken,
  generateLoginToken,
  emailType
};
