const User = require("../models/User");
const Profile = require("../models/Profile");
const Review = require("../models/Review");
const Image = require("../models/Image");
const Book = require("../models/Book");
const userService = require("../services/user");
const emailService = require("../services/email");
const { generateEmailToken, generateLoginToken } = require("../helpers");
const { CONFIRMATION, FORGOT } = require("../helpers/emailTypes");
const JWT = require("jsonwebtoken");

const getById = async id => {
  const user = await User.findById(id);
  return user;
};

const getByField = async field => {
  const user = await User.findOne(field);
  return user;
};

const create = async (email, firstName, lastName, password) => {
  const newUser = await User.create({
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: password,
    local: { firstName, lastName, email, password }
  });
  return newUser;
};

const deleteById = async id => {
  await Book.findOneAndRemove({ user: id });
  await Image.findOneAndRemove({ user: id });
  await Review.findOneAndRemove({ user: id });
  await Profile.findOneAndRemove({ user: id });
  await User.findOneAndRemove({ _id: id });
  return null;
};

const update = async (id, field, method) => {
  const user = await User.findOneAndUpdate(
    { _id: id },
    { [method]: field },
    { new: true }
  );
  return user;
};

const sendConfirmationEmail = async (user, uri) => {
  const { id, email, firstName } = user;
  const token = await generateEmailToken(id);
  const { subject, html } = await emailService.content(
    CONFIRMATION,
    uri,
    token,
    firstName
  );
  const result = await emailService.compose(email, subject, html);
  return result;
};

const register = async registerToken => {
  const { user: id } = JWT.verify(registerToken, process.env.EMAIL_SECRET);
  const user = await update(id, { confirmed: true }, "$set");
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
  const { subject, html } = await emailService.content(
    FORGOT,
    uri,
    token,
    firstName
  );
  await emailService.compose(email, subject, html);
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

module.exports = {
  getById,
  deleteById,
  getByField,
  create,
  update,
  sendConfirmationEmail,
  register,
  forgot,
  reset
};
