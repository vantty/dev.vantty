const client = require('twilio')(
  process.env.TWILIO_ACCOUNT,
  process.env.TWILIO_TOKEN
);

const send = async (number, msg) => {
  try {
    const { to } = await client.messages.create({
      body: msg,
      from: '+15878408184',
      to: number,
    });
    return to;
  } catch (error) {
    console.log('Service Error', error);
    return null;
  }
};

module.exports = { send };
