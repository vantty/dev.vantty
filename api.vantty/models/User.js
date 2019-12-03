const { Schema, model } = require("mongoose"),
  bcrypt = require("bcryptjs");
const log = console.log;
const userSchema = new Schema(
  {
    // methods: { type: String },
    method: {
      type: String,
      enum: ["local", "google", "facebook"],
      required: true
    },
    confirmed: { type: Boolean, default: false },
    local: {
      firstName: { type: String },
      profilePicture: {
        original: {
          type: String
        },
        cloudId: {
          type: String
        }
      },
      lastName: { type: String },
      email: { type: String, lowercase: true, unique: true, sparse: true },
      password: { type: String },
      resetPasswordToken: { type: String },
      resetPasswordExpires: { type: Date }
    },
    google: {
      id: { type: String },
      profilePicture: {
        original: {
          type: String
        },
        cloudId: {
          type: String
        }
      },
      firstName: { type: String },
      lastName: { type: String },
      email: { type: String, lowercase: true, unique: true, sparse: true }
    },
    facebook: {
      id: { type: String },
      profilePicture: {
        original: {
          type: String
        },
        cloudId: {
          type: String
        }
      },
      firstName: { type: String },
      lastName: { type: String },
      email: { type: String, lowercase: true, unique: true, sparse: true }
    },
    role: {
      type: String,
      default: "Suscriber"
    },
    stripeCustomerId: { type: String },
    profile: { type: Boolean, default: false }
  },

  { timestamps: true }
);

userSchema.pre("save", async function(next) {
  if (this.method == "local" && !this.google.id) {
    try {
      const salt = await bcrypt.genSalt(14);
      const hash = await bcrypt.hash(this.local.password, salt);
      this.local.password = hash;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

userSchema.methods.isValidPassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.local.password);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = model("User", userSchema);
