const twilioService = require('../services/twilio');
const { test } = require('../helpers/numbers');

exports.send = async (req, res) => {
  try {
    // const {
    //   body: { numbers }
    // } = req;
    const numbers = test;
    let result = 0;
    await numbers.forEach(number => {
      twilioService.send(number).then(res => {
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
