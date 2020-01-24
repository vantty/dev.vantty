const User = require("../models/User");
const userService = require("../services/user");
const { generateEmailToken, composeEmail, emailType } = require("../helpers");
const { CONFIRMATION } = require("../helpers/emailTypes");

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

module.exports = { sendConfirmationEmail };
