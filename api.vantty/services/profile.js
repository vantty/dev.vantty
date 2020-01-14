const Profile = require("../models/Profile");
const Review = require("../models/Review");
const Image = require("../models/Image");
const Book = require("../models/Book");
const reviewService = require("../services/review");
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

  // Build profile object
  var method = user.method;

  const profileFields = {};
  profileFields.user = user.id;
  // Build name object
  profileFields.name = {};
  profileFields.name.firstName = user[method].firstName;
  profileFields.name.lastName = user[method].lastName;

  // Build service array
  // profileFields.services = [];
  // if (services) profileFiels.services = services;
  // if (instagram) profileFiels.service.description = description;
  // if (instagram) profileFiels.service.amount = amount;
  // if (service) profileFields.service.push(profileFields.service);

  profileFields.profilePicture = user[method].profilePicture.original;
  if (bio) profileFields.bio = bio || "";
  // profileFields.bio = bio || "";
  // if (area) profileFields.area = area;
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

  // Build location object
  profileFields.address = {};
  if (street) profileFields.address.street = street;
  if (log) profileFields.address.log = log;
  if (lat) profileFields.address.lat = lat;

  profileFields.place = place;

  profileFields.delivery = delivery;

  // Build social object
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (instagram) profileFields.social.instagram = instagram;

  let profile = await Profile.findOne({ user: user.id });

  if (profile) {
    // Update
    profile = await Profile.findOneAndUpdate(
      { user: user.id },
      { $set: profileFields },
      { new: true }
    );

    return profile;
  }

  //Create Review
  const { _id: reviewId } = await reviewService.create(user.id);
  profileFields.reviewId = reviewId;

  // Create images id
  const newImages = new Image({
    user: user.id,
    name:
      user.local.firstName || user.google.firstName || user.facebook.firstName
  });
  const imagesArtist = await newImages.save();
  profileFields.imagesId = newImages.id;

  // Create Book id
  const newBook = new Book({
    user: user.id,
    name:
      user.local.firstName || user.google.firstName || user.facebook.firstName
  });
  const bookArtists = await newBook.save();
  profileFields.bookId = newBook.id;

  // Create
  profile = new Profile(profileFields);

  await profile.save();

  return profile;
};

module.exports = { save };
