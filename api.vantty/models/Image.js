const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String
  },
  pictures: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      original: {
        type: String
      },
      cloudId: {
        type: String
      },
      tag: { type: String },
      elasticId: { type: String, default: null },

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

module.exports = Image = mongoose.model("Image", ImageSchema);
