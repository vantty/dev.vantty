const User = require("../models/User");
const Profile = require("../models/Profile");
const Review = require("../models/Review");
const Image = require("../models/Image");
const Book = require("../models/Book");
const stripeService = require("../services/stripe");
const { newCardObj } = require("../helpers");

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

const update = async (id, field, method) => {
  const user = await User.findOneAndUpdate(
    { _id: id },
    { [method]: field },
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
  const newCard = await newCardObj(card);
  const user = await update(
    id,
    {
      stripeCustomerId: customerId,
      cards: newCard
    },
    "$set"
  );
  return user;
};

const card = async (stripeCustomerId, source, id, cards) => {
  const card = await stripeService.createSource(stripeCustomerId, source);
  const existingCard = cards.find(
    existingCard => existingCard.fingerPrint === card.fingerprint
  );
  if (existingCard) {
    await stripeService.deleteSource(stripeCustomerId, card.id);
    const user = await getById(id);
    return user;
    // DEBE ENVIAR UN ERROR DE QUE LA TARJETA YA EXISTE
  } else {
    const newCard = await newCardObj(card);
    const user = await update(id, { cards: newCard }, "$push");
    return user;
  }
};

module.exports = { deleteById, update, customer, card };
