const User = require("../models/User");
const userService = require("../services/user");
const {
  generateEmailToken,
  generateLoginToken,
  composeEmail,
  emailType
} = require("../helpers");
const { CONFIRMATION } = require("../helpers/emailTypes");
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

module.exports = { sendConfirmationEmail, register };
