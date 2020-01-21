const userService = require("../services/user");

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

exports.saveCard = async (req, res) => {
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

exports.deleteCard = async (req, res) => {
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

exports.deleteAccount = async (req, res) => {
  try {
    const {
      user: { id }
    } = req;
    const result = await userService.deleteById(id);
    res.status(204).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
