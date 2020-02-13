const sripeLoader = require("stripe");
const stripe = new sripeLoader(process.env.STRIPE_SECRET_KEY_TEST);
// const stripe = new sripeLoader(process.env.STRIPE_SECRET_KEY);
const { newCardObj } = require("../helpers");

const createAccount = async code => {
  const { stripe_user_id: stripeArtistAccount } = await stripe.oauth.token({
    grant_type: "authorization_code",
    code: code
  });
  const {
    external_accounts: { data }
  } = await stripe.accounts.retrieve(stripeArtistAccount);
  const stripeBankData = {
    bankId: data[0].id,
    country: data[0].country,
    currency: data[0].currency,
    bankName: data[0].bank_name,
    routingNumber: data[0].routing_number,
    last4: data[0].last4
  };
  return { stripeArtistAccount, stripeBankData };
};

const createCustomer = async (id, token) => {
  const {
    id: customerId,
    default_source: source
  } = await stripe.customers.create({
    name: id,
    source: token
  });
  const card = await retrieveSource(customerId, source);
  const newCard = await newCardObj(card);
  return { customerId, newCard };
};

const saveCard = async (stripeCustomerId, source, id, cards) => {
  const card = await createSource(stripeCustomerId, source);
  const existingCard = cards.find(
    existingCard => existingCard.fingerPrint === card.fingerprint
  );
  if (existingCard) {
    await deleteSource(stripeCustomerId, card.id);
    return null;
  } else {
    const newCard = await newCardObj(card);
    return newCard;
  }
};

const deleteCard = async (user, stripeCardId) => {
  const { stripeCustomerId } = user;
  await deleteSource(stripeCustomerId, stripeCardId);
  const card = user.cards.find(card => card.stripeCardId === stripeCardId);
  const index = user.cards.indexOf(card);
  await user.cards.splice(index, 1);
  await user.save();
  return user;
};

const createSource = async (stripeCustomerId, source) => {
  const card = await stripe.customers.createSource(stripeCustomerId, {
    source: source
  });
  return card;
};

const retrieveSource = async (customerId, source) => {
  const card = await stripe.customers.retrieveSource(customerId, source);
  return card;
};

const deleteSource = async (stripeCustomerId, cardId) => {
  await stripe.customers.deleteSource(stripeCustomerId, cardId);
  return null;
};

const charge = (customer, card, artist, amount) => {
  return stripe.charges.create({
    amount: amount * 100,
    currency: "cad",
    customer: customer,
    source: card,
    description: "Vantty Service",
    transfer_data: {
      amount: amount * 100 * 0.72,
      destination: artist
    }
  });
};

module.exports = {
  createAccount,
  createCustomer,
  saveCard,
  deleteCard,
  retrieveSource,
  createSource,
  deleteSource,
  charge
};
