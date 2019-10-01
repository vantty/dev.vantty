const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    //firstName, lastName,
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
    // unique review id,
    type: String
  },
  profilePicture: { type: String },

  bio: {
    type: String
    // required: true
  },
  price: {
    type: Number
    // required: true
  },

  profession: {
    type: [String]
    // required: true
  },

  mobileNumber: {
    type: String,
    default: null
    // required: true
  },
  instagramUsername: {
    type: String
  },
  education: [
    {
      school: {
        type: String
        // required: true
      },
      degree: {
        type: String
        // required: true
      },
      description: {
        type: String
      }
    }
  ],
  categories: { makeup: [String], hair: [String] },

  portfolioPictures: [
    {
      original: {
        type: String
      },
      cloudId: {
        type: String
      },
      cloudId: {
        type: [String]
      }
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
    // required: true
  },
  elasticId: { type: String, default: null },

  // area: {
  //   country: {
  //     type: String
  //   },
  //   state: {
  //     type: String
  //   },
  //   city: {
  //     type: String
  //   }
  // },
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
