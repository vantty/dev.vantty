const sripeLoader = require("stripe");
const stripe = new sripeLoader(process.env.STRIPE_SECRET_KEY_TEST);
// const stripe = new sripeLoader(process.env.STRIPE_SECRET_KEY);
const profileService = require("../services/profile");

const createAccount = async (id, code) => {
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
  const result = await profileService.update(
    id,
    {
      stripeArtistAccount: stripeArtistAccount,
      stripeBankData: stripeBankData
    },
    "$set"
  );
  return result;
};

const createCustomer = async (id, source) => {
  const customer = await stripe.customers.create({
    name: id,
    source: source
  });
  return customer;
};

const retrieveSource = async (customerId, source) => {
  const card = await stripe.customers.retrieveSource(customerId, source);
  return card;
};

const createSource = async (stripeCustomerId, source) => {
  const card = await stripe.customers.createSource(stripeCustomerId, {
    source: source
  });
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
  retrieveSource,
  createSource,
  deleteSource,
  charge
};
