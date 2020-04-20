require('dotenv-flow').config();
const express = require('express');
const expressValidator = require('express-validator');
const formData = require('express-form-data');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const apiRoutes = require('./routes');

const cors = require('./config/cors');
const specs = require('./config/swagger');

const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    if (process.env.NODE_ENV !== 'test') {
      console.log('Connected to %s', process.env.MONGODB_URI);
      console.log('App is running ... \n');
      console.log('Press CTRL + C to stop the process. \n');
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();

app.set('PORT', process.env.PORT || 5000);

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.use(helmet());
app.use(cors());
app.use(expressValidator());
app.use(express.json({ extended: false }));
app.use(formData.parse());

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev') {
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));
}

app.use('/api', apiRoutes);

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

module.exports = app;
