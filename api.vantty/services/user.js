const User = require("../models/User");
const Profile = require("../models/Profile");
const Review = require("../models/Review");
const Image = require("../models/Image");
const Book = require("../models/Book");
const stripeService = require("../services/stripe");

const getById = async id => {
  const user = await User.findById(id);
  return user;
};

const deleteById = async id => {
  await Book.findOneAndRemove({ user: id });
  await Image.findOneAndRemove({ user: id });
  await Review.findOneAndRemove({ user: id });
  await Profile.findOneAndRemove({ user: id });
  await User.findOneAndRemove({ _id: id });
  return null;
};

const update = async (id, field) => {
  const user = await User.findOneAndUpdate(
    { _id: id },
    { $set: field },
    { new: true }
  );
  return user;
};

const customer = async (id, token) => {
  const {
    id: customerId,
    default_source: source
  } = await stripeService.createCustomer(id, token);
  const card = await stripeService.retrieveSource(customerId, source);
  const newCard = {
    stripeCardId: source,
    fingerPrint: card.fingerprint,
    brand: card.brand,
    expMonth: card.exp_month,
    expYear: card.exp_year,
    last4: card.last4
  };
  // user.stripeCustomerId = customerId;

  console.log("CARD", newCard);
  const user = await update(id, {
    stripeCustomerId: customerId,
    cards: newCard
  });
  console.log("USER", user);
  return user;
  // user.cards.push(newCard);
  // await user.save();
};

module.exports = { deleteById, update, customer };
