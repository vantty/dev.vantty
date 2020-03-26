const client = require('twilio')(
  process.env.TWILIO_ACCOUNT,
  process.env.TWILIO_TOKEN
);

const send = async number => {
  await client.messages.create({
    body: 'Test',
    from: '+15878408184',
    to: number
  });
};

module.exports = { send };
