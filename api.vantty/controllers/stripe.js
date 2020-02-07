const stripeService = require("../services/stripe");
const userService = require("../services/user");
const profileService = require("../services/profile");

exports.createAccount = async (req, res) => {
  try {
    const {
      user: { id },
      params: { code }
    } = req;
    const {
      stripeArtistAccount,
      stripeBankData
    } = await stripeService.createAccount(code);
    const result = await profileService.update(
      id,
      {
        stripeArtistAccount: stripeArtistAccount,
        stripeBankData: stripeBankData
      },
      "$set"
    );
    await userService.update(id, { profile: true }, "$set");
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const {
      user: { id },
      body: {
        token: { id: token }
      }
    } = req;
    const { customerId, newCard } = await stripeService.createCustomer(
      id,
      token
    );
    const result = await userService.update(
      id,
      {
        stripeCustomerId: customerId,
        cards: newCard
      },
      "$set"
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.createCustomerCard = async (req, res) => {
  try {
    const {
      user: { id, stripeCustomerId, cards },
      body: {
        token: { id: source }
      }
    } = req;
    const newCard = await stripeService.saveCard(
      stripeCustomerId,
      source,
      id,
      cards
    );
    if (newCard) {
      const result = await userService.update(id, { cards: newCard }, "$push");
      res.status(200).json(result);
    } else {
      return res.status(403).json({ message: "Card already exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.deleteCustomerCard = async (req, res) => {
  try {
    const {
      user,
      params: { card_id: stripeCardId }
    } = req;
    const result = await stripeService.deleteCard(user, stripeCardId);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};