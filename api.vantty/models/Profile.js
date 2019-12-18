const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  stripeBankData: {
    bankId: { type: String },
    country: { type: String },
    currency: { type: String },
    bankName: { type: String },
    routingNumber: { type: String },
    last4: { type: String }
  },
  stripeArtistAccount: { type: String },
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
  bookId: {
    type: String
  },
  gender: {
    type: String
  },
  qualified: {
    type: String
  },
  englishLevel: {
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
  availability: {
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

  services: [
    {
      typeOfService: {
        type: String
      },
      description: {
        type: String
      },
      amount: { type: Number }
    }
  ],
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
