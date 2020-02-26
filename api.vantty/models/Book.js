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
      appointmentDate: {
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
      appointmentTimeStamp: {
        type: Number
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
      requestTimeStamp: {
        type: Number
      },
      cancelDate: {
        type: String
      },
      cancelTimeStamp: {
        type: Number
      },
      chargeStatus: { type: String, default: "pending" },
      cancelPolicy: { type: String, default: null },
      cancelFee: { type: Number, default: 0 },
      bookCode: { type: String },
      stripeCustomerId: { type: String },
      stripeCardId: { type: String },
      stripeArtistAccount: { type: String }
    }
  ]
});

module.exports = Book = mongoose.model("Book", BookSchema);
