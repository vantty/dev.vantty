const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String
  },
  bookings: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      name: {
        type: String
      },
      date: {
        type: String
      },
      address: {
        street: {
          type: String
        },
        log: {
          type: Number
        },
        lat: {
          type: Number
        }
      },
      descriptionAddress: {
        type: String
      },
      timeStampAppointment: {
        type: String
      },
      services: [Object],
      totalValue: {
        type: Number
      },
      taxes: {
        type: Number
      },
      state: {
        type: String,
        default: "request"
      },
      userId: {
        type: String
      },
      requestDate: {
        type: String
      },
      timeStamp: {
        type: Number
      },
      bookCode: { type: String },
      stripeCustomerId: { type: String },
      stripeCardId: { type: String },
      stripeArtistAccount: { type: String }
    }
  ]
});

module.exports = Book = mongoose.model("Book", BookSchema);
