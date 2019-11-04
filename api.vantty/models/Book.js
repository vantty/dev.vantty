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
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      current: {
        type: String
      },
      date: {
        type: Date
      },
      hour: {
        type: String
      },
      services: [
        {
          kind: {
            type: String
          },
          value: {
            type: Number
          }
        }
      ],
      totalValue: {
        type: Number
      },
      taxes: {
        type: Number
      },

      date: {
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
