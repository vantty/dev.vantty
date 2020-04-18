const express = require('express');

const userRoutes = require('./users');
const profileRoutes = require('./profile');
const reviewRoutes = require('./review');
const imagesRoutes = require('./images');
const bookRoutes = require('./book');
const stripeRoutes = require('./stripe');
const elasticRoutes = require('./elastic');
const twilioRoutes = require('./twilio');

const app = express();

app.use('/user', userRoutes);
app.use('/profile', profileRoutes);
app.use('/review', reviewRoutes);
app.use('/images', imagesRoutes);
app.use('/book', bookRoutes);
app.use('/stripe', stripeRoutes);
app.use('/elastic', elasticRoutes);
app.use('/twilio', twilioRoutes);

module.exports = app;
