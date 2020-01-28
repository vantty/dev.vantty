const User = require("../models/User");
const userService = require("../services/user");
const {
  generateEmailToken,
  generateLoginToken,
  composeEmail,
  emailType
} = require("../helpers");
const { CONFIRMATION, FORGOT } = require("../helpers/emailTypes");
const JWT = require("jsonwebtoken");

const sendConfirmationEmail = async (user, uri) => {
  const { id, email, firstName } = user;
  const token = await generateEmailToken(id);
  const { subject, html } = await emailType(
    CONFIRMATION,
    uri,
    token,
    firstName
  );
  const result = await composeEmail(email, subject, html);
  return result;
};

const register = async registerToken => {
  const { user: id } = JWT.verify(registerToken, process.env.EMAIL_SECRET);
  const user = await userService.update(id, { confirmed: true }, "$set");
  const token = await generateLoginToken(user);
  return token;
};

const forgot = async (id, email, firstName, uri) => {
  console.log("USER", id, email, firstName, uri);
  const token = await generateEmailToken(id);
  const date = Date.now() + 3600 * 1000;
  const user = await userService.update(
    id,
    {
      resetPasswordToken: token,
      resetPasswordExpires: date
    },
    "$set"
  );
  const { subject, html } = await emailType(FORGOT, uri, token, firstName);
  console.log("SUB", subject);
  await composeEmail(email, subject, html);
  return user;
};

const reset = async (id, password) => {
  const user = await userService.update(
    id,
    {
      resetPasswordToken: null,
      resetPasswordExpires: null
    },
    "$set"
  );
  user.password = password;
  await user.save();
  return user;
};

module.exports = { sendConfirmationEmail, register, forgot, reset };
