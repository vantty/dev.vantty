const twilioService = require('../services/twilio');

exports.send = async (req, res) => {
  try {
    const {
      body: { numbers }
    } = req;
    let result = 0;
    await numbers.forEach(number => {
      twilioService.send(number);
      result = result + 1;
    });
    res.status(201).json({ messagesSend: result });
  } catch (error) {
    return res.status(500).json({
      message: 'Server Error'
    });
  }
};
