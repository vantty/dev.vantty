require('dotenv-flow').config();
const express = require('express');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const morgan = require('morgan');
const cors = require('cors');
const formData = require('express-form-data');
const userRoutes = require('./routes/users');
const profileRoutes = require('./routes/profile');
const reviewRoutes = require('./routes/review');
const imagesRoutes = require('./routes/images');
const bookRoutes = require('./routes/book');
const stripeRoutes = require('./routes/stripe');
const elasticRoutes = require('./routes/elastic');
const twilioRoutes = require('./routes/twilio');
const app = express();

// Connect Database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('DB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();

// CORS config
var whitelist = [
  'http://localhost:3000',
  'https://vantty.ca',
  'https://www.vantty.ca',
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Init Middleware
app.use(morgan('dev'));
app.use(expressValidator());
app.use(express.json({ extended: false }));
app.use(cors(corsOptions));
app.use(formData.parse());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/images', imagesRoutes);
app.use('/api/book', bookRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/elastic', elasticRoutes);
app.use('/api/twilio', twilioRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// Connect Server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

module.exports = app;
