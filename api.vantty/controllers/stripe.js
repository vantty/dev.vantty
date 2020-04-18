const stripeService = require('../services/stripe');
const userService = require('../services/user');
const profileService = require('../services/profile');

exports.createAccount = async (req, res) => {
  try {
    const {
      user: { id },
      params: { code },
    } = req;

    const {
      stripeArtistAccount,
      stripeBankData,
      support_phone,
    } = await stripeService.createAccount(code);

    const { url: stripeLink } = await stripeService.generateLink(
      stripeArtistAccount
    );
    const result = await profileService.update(
      id,
      {
        stripeArtistAccount: stripeArtistAccount,
        stripeBankData: stripeBankData,
        stripeLink: stripeLink,
        mobileNumber: support_phone,
      },
      '$set'
    );
    await userService.update(id, { mobileNumber: support_phone }, '$set');
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const {
      user: { id, email },
      body: {
        token: { id: token },
      },
    } = req;
    const { customerId, newCard } = await stripeService.createCustomer(
      id,
      email,
      token
    );
    const result = await userService.update(
      id,
      {
        stripeCustomerId: customerId,
        cards: newCard,
      },
      '$set'
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.retrieveAccount = async (req, res) => {
  try {
    const {
      params: { account_id: accountId },
    } = req;
    const result = await stripeService.retrieveAccount(accountId);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const {
      params: { account_id: accountId },
    } = req;
    const result = await stripeService.deleteAccount(accountId);
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
        token: { id: source },
      },
    } = req;
    const newCard = await stripeService.saveCard(
      stripeCustomerId,
      source,
      id,
      cards
    );
    if (newCard) {
      const result = await userService.update(id, { cards: newCard }, '$push');
      res.status(200).json(result);
    } else {
      return res.status(403).json({ message: 'Card already exist' });
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
      params: { card_id: stripeCardId },
    } = req;
    const result = await stripeService.deleteCard(user, stripeCardId);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
