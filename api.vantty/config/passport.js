const passport = require("passport"),
  JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt,
  LocalStrategy = require("passport-local").Strategy,
  GooglePlusTokenStrategy = require("passport-google-plus-token"),
  FacebookTokenStrategy = require("passport-facebook-token"),
  JWT_SECRET = "vanttymakeup",
  googleID =
    "259457812212-sj1ga4eqacoqubksrl53e6pjgan5pp9o.apps.googleusercontent.com",
  googleSecret = "4iNaE1fePXJr_qA5BwfvEnG3",
  facebookID = "619096385268555",
  facebookSecret = "6e803fddc4394afd081a1fc8f384b59e",
  User = require("../models/User");

// JWT Strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: JWT_SECRET
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
      clientID: googleID,
      clientSecret: googleSecret
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        const newUser = await User.create({
          method: "google",
          google: {
            id: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            profilePicture: profile.photos[0].value,
            email: profile.emails[0].value
          }
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
      clientID: facebookID,
      clientSecret: facebookSecret
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ "facebook.id": profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        const newUser = await User.create({
          method: "facebook",
          facebook: {
            id: profile.id,
            profilePicture: profile.photos[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value
          }
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
