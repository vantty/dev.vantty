const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  name: {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    }
  },
  reviewId: {
    type: String
  },
  imagesId: {
    type: String
  },
  profilePicture: { type: String },

  bio: {
    type: String
  },
  price: {
    type: Number
  },

  profession: {
    type: [String]
  },

  mobileNumber: {
    type: String
    // default: null
    // required: true
  },
  instagramUsername: {
    type: String
  },
  // education: [
  //   {
  //     school: {
  //       type: String
  //     },
  //     degree: {
  //       type: String
  //     },
  //     description: {
  //       type: String
  //     }
  //   }
  // ],
  categories: { makeup: [String], hair: [String] },

  // portfolioPictures: [
  //   {
  //     original: {
  //       type: String
  //     },
  //     cloudId: {
  //       type: String
  //     },
  //     tag: { type: String },
  //     elasticId: { type: String, default: null }
  //   }
  // ],
  social: {
    youtube: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  city: {
    type: [String]
  },

  verified: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("Profile", ProfileSchema);
