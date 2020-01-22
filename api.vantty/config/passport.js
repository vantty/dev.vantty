const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const FacebookTokenStrategy = require("passport-facebook-token");
const User = require("../models/User");

// JWT Strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: process.env.JWT_SECRET
    },
    async (payLoad, done) => {
      try {
        const user = await User.findById(payLoad.sub);
        if (!user) {
          return done(null, false);
        }
        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

// Google OAuth Strategy
passport.use(
  "googleToken",
  new GooglePlusTokenStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        const email = profile.emails[0].value;
        const user = await User.findOne({ email });
        if (user) {
          return done(null, false);
        }
        const newUser = await User.create({
          method: "google",
          google: {
            id: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            profilePicture: profile.photos[0].value,
            email: profile.emails[0].value
          },
          email: profile.emails[0].value
        });
        done(null, newUser);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

// Facebook OAuth Strategy
passport.use(
  "facebookToken",
  new FacebookTokenStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ "facebook.id": profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        const email = profile.emails[0].value;
        const user = await User.findOne({ email });
        if (user) {
          return done(null, false);
        }
        const newUser = await User.create({
          method: "facebook",
          facebook: {
            id: profile.id,
            profilePicture: profile.photos[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value
          },
          email: profile.emails[0].value
        });
        done(null, newUser);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

// Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ "local.email": email });
        if (!user) {
          return done(null, false, {
            errors: { "email or password": "is invalid" }
          });
        }
        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
          return done(null, false, {
            errors: { "email or password": "is invalid" }
          });
        }
        return done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);
