const { Schema, model } = require("mongoose"),
  bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    method: {
      type: String,
      enum: ["local", "google", "facebook"],
      required: true
    },
    confirmed: { type: Boolean, default: false },
    local: {
      firstName: { type: String },
      lastName: { type: String },
      email: { type: String, lowercase: true, unique: true, sparse: true },
      password: { type: String }
    },
    google: {
      id: { type: String },
      profilePicture: { type: String },
      firstName: { type: String },
      lastName: { type: String },
      email: { type: String, lowercase: true, unique: true, sparse: true }
    },
    facebook: {
      id: { type: String },
      profilePicture: { type: String },
      firstName: { type: String },
      lastName: { type: String },
      email: { type: String, lowercase: true, unique: true, sparse: true }
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next) {
  if (this.method !== "local") {
    next();
  }
  try {
    const salt = await bcrypt.genSalt(14);
    const hash = await bcrypt.hash(this.local.password, salt);
    this.local.password = hash;
    next();
  } catch (err) {
    next(err);
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
