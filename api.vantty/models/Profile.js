const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    //firstName, lastName,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  reviewId: {
    // unique review id,
    type: String
  },
  profilePicture: {
    type: String
    // required: true
  },
  bio: {
    type: String
    // required: true
  },

  profession: {
    type: [String]
    // required: true
  },
  location: {
    country: {
      type: String
    },
    state: {
      type: String
    },
    city: {
      type: String
    }
  },
  mobileNumber: {
    type: String
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

  portfolioPictures: [
    {
      original: {
        type: String
      },
      cloudId: {
        type: String
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
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("Profile", ProfileSchema);