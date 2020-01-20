const sripeLoader = require("stripe");
const stripe = new sripeLoader(process.env.STRIPE_SECRET_KEY_TEST);
// const stripe = new sripeLoader(process.env.STRIPE_SECRET_KEY);
const profileService = require("../services/profile");
const userService = require("../services/user");

const account = async (id, code) => {
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
  await userService.update(id, { profile: true });
  const result = await profileService.update(id, {
    stripeArtistAccount: stripeArtistAccount,
    stripeBankData: stripeBankData
  });
  return result;
};

module.exports = { account };