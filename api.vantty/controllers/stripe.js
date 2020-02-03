const stripeService = require("../services/stripe");
const userService = require("../services/user");

exports.createAccount = async (req, res) => {
  try {
    const {
      user: { id },
      params: { code }
    } = req;
    const result = stripeService.createAccount(id, code);
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
    const result = await userService.createCustomer(id, token);
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
    const result = await userService.saveCard(
      stripeCustomerId,
      source,
      id,
      cards
    );
    res.status(200).json(result);
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
    const result = await userService.deleteCard(user, stripeCardId);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
