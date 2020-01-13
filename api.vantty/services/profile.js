const Profile = require("../models/Profile");
const Review = require("../models/Review");
const Image = require("../models/Image");
const Book = require("../models/Book");
const reviewService = require("../services/review");
const imageService = require("../services/image");
const bookService = require("../services/book");

const getById = async id => {
  const profile = await Profile.findOne({
    user: id
  });
  return profile;
};
const getAll = async () => {
  const profiles = await Profile.find();
  return profiles;
};

const save = async (data, user) => {
  const {
    profilePicture,
    bio,
    profession,
    mobileNumber,
    instagramUsername,
    youtube,
    instagram,
    availability,
    review,
    country,
    state,
    city,
    price,
    qualified,
    gender,
    firstName,
    lastName,
    verified,
    typeOfService,
    description,
    amount,
    services,
    englishLevel,
    place,
    delivery,
    // address: { street, lat, log }
    street,
    log,
    lat
  } = data;

  // Create Profile Fields
  let method = user.method;
  const profileFields = {};
  profileFields.user = user.id;
  profileFields.name = {};
  profileFields.name.firstName = user[method].firstName;
  profileFields.name.lastName = user[method].lastName;
  profileFields.profilePicture = user[method].profilePicture.original;
  if (bio) profileFields.bio = bio || "";
  if (mobileNumber) profileFields.mobileNumber = mobileNumber;
  if (price) profileFields.price = price;
  if (instagramUsername) profileFields.instagramUsername = instagramUsername;
  if (profession) {
    profileFields.profession = profession;
  }
  if (availability) {
    profileFields.availability = availability;
  }
  if (qualified) {
    profileFields.qualified = qualified;
  }
  if (gender) {
    profileFields.gender = gender;
  }
  if (englishLevel) {
    profileFields.englishLevel = englishLevel;
  }
  if (city) {
    profileFields.city = city;
  }
  if (verified) {
    profileFields.verified = verified;
  }
  profileFields.address = {};
  if (street) profileFields.address.street = street;
  if (log) profileFields.address.log = log;
  if (lat) profileFields.address.lat = lat;
  if (place) {
    profileFields.place = place;
  }
  if (delivery) {
    profileFields.delivery = delivery || false;
  }
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (instagram) profileFields.social.instagram = instagram;

  // Create Review Id
  const { _id: reviewId } = await reviewService.create(user.id);
  profileFields.reviewId = reviewId;

  // Create Images id
  const { _id: imagesId } = await imageService.create(user.id);
  profileFields.imagesId = imagesId;

  // Create Images id
  const { _id: bookId } = await bookService.create(user.id);
  profileFields.bookId = bookId;

  let profile = await getById(user);
  if (profile) {
    profile = await Profile.findOneAndUpdate(
      { user: user.id },
      { $set: profileFields },
      { new: true }
    );
    return profile;
  }

  profile = new Profile(profileFields);
  await profile.save();
  return profile;
};

module.exports = { getById, getAll, save };
