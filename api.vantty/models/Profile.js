const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  stripeBankData: {
    bankId: { type: String, default: null },
    country: { type: String, default: null },
    currency: { type: String, default: null },
    bankName: { type: String, default: null },
    routingNumber: { type: String, default: null },
    last4: { type: String, default: null }
  },
  stripeArtistAccount: { type: String, default: null },
  stripeLink: { type: String, default: null },
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
  profileImage: { type: String, default: null },

  bio: {
    type: String
  },
  price: {
    type: Number
  },
  place: {
    type: Boolean,
    default: false
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
  delivery: {
    type: Boolean,
    default: false
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
  profileStarted: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("Profile", ProfileSchema);
