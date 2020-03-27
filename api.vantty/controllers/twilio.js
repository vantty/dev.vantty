const twilioService = require('../services/twilio');
const { msg, toronto } = require('../helpers/numbers');

exports.send = async (req, res) => {
  try {
    let result = 0;
    // const numbers = toronto.slice(0, 50); // sent march-27th
    // const numbers = toronto.slice(50, 100); // sent march-28th
    // const numbers = toronto.slice(100, 150); // sent march-29th
    // const numbers = toronto.slice(150, 200); // sent march-30th
    // const numbers = toronto.slice(200, 242); // sent march-30th
    await numbers.forEach(number => {
      twilioService.send(number, msg).then(res => {
        console.log('NUM', res);
      });
      result = result + 1;
    });
    res.status(201).json({ messagesSend: result });
  } catch (error) {
    return res.status(500).json({
      message: 'Server Error'
    });
  }
};
