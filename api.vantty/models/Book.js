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

      appointment: {
        type: String
      },
      address: {
        type: String
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

      requestDate: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Book = mongoose.model("Book", BookSchema);
