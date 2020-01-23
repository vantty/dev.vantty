const User = require("../models/User");
const userService = require("../services/user");
const { generateEmailToken, composeEmail } = require("../helpers");

const sendEmail = async (
  method,
  email,
  firstName,
  lastName,
  password,
  headers
) => {
  const existingUser = await userService.getByField({ email });
  if (existingUser) {
    return null;
  }
  const newUser = await userService.create(
    method,
    email,
    firstName,
    lastName,
    password
  );
  const token = await generateEmailToken(newUser);
  const subject = "Email Confirmation";
  const url = `${headers}/confirmation/${token}`;
  const html = `Hi ${firstName}, welcome to Vantty! To confirm your email address please <a href=${url}><strong>click here.</strong></a>`;
  await composeEmail(email, subject, html);

  return newUser;
};

module.exports = { sendEmail };
