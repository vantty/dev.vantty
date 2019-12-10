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
      appointment: {
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
      hour: {
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
      requestDate: {
        type: Date,
        default: Date.now
      },
      bookCode: { type: String },
      stripeCustomerId: { type: String },
      stripeCardId: { type: String },
      stripeArtistAccount: { type: String }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Book = mongoose.model("Book", BookSchema);
