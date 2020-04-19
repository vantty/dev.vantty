const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema(
  {
    method: { type: String, default: 'local' },
    methodId: { type: String, default: null },
    email: { type: String, lowercase: true, unique: true, sparse: true },
    mobileNumber: { type: String, default: '' },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String, default: null },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    profileImage: {
      original: {
        type: String,
        default: null,
      },
      cloudId: {
        type: String,
        default: null,
      },
    },
    //
    confirmed: { type: Boolean, default: false },
    role: {
      type: String,
      default: 'Subscriber',
    },
    stripeCustomerId: { type: String },
    cards: [
      {
        stripeCardId: { type: String },
        fingerPrint: { type: String },
        brand: { type: String },
        expMonth: { type: String },
        expYear: { type: String },
        last4: { type: String },
      },
    ],
    bookings: [String],
    profile: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (this.method == 'local') {
    try {
      const salt = await bcrypt.genSalt(14);
      const hash = await bcrypt.hash(this.password, salt);
      this.password = hash;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = model('User', userSchema);
