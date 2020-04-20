const cors = require('cors');

const corsConfig = function () {
  const whitelist = ['https://vantty.ca', 'https://www.vantty.ca'];

  const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };

  if (
    process.env.NODE_ENV &&
    process.env.NODE_ENV !== 'test' &&
    process.env.NODE_ENV !== 'dev'
  ) {
    return cors(corsOptions);
  }
  return cors();
};

module.exports = corsConfig;
