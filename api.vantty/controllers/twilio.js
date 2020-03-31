const twilioService = require('../services/twilio');
const { msg, test: numbers } = require('../helpers/numbers');

exports.send = async (req, res) => {
  try {
    let result = 0;
    // const numbers = toronto.slice(0, 50);
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
