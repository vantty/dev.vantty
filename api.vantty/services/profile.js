const Profile = require("../models/Profile");
const reviewService = require("../services/review");
const imageService = require("../services/image");
const bookService = require("../services/book");
const userService = require("../services/book");

const getById = async id => {
  const profile = await Profile.findOne({
    user: id
  });
  return profile;
};

const getByField = async field => {
  const profile = await Profile.findOne(field);
  return profile;
};

const getAll = async () => {
  const profiles = await Profile.find();
  return profiles;
};

const create = async (user, fields) => {
  //Properties User
  const { id, firstName, lastName, profileImage } = user;
  //validate Profile
  const profileExist = await getById(id);

  if (profileExist) {
    const result = await update(id, fields, "$set");
    return result;
  } else {
    // Create Review Id
    const { _id: reviewId } = await reviewService.create(id);
    // Create Images id
    const { _id: imagesId } = await imageService.create(id);
    // Create Images id
    const { _id: bookId } = await bookService.create(id);
    const newProfileFields = {
      ...fields,
      user: id,
      reviewId: reviewId,
      imagesId: imagesId,
      bookId: bookId,
      name: { firstName, lastName },
      profileImage: profileImage.original
    };

    const newProfile = await new Profile(newProfileFields);
    await newProfile.save();
    return newProfile;
  }
};

const update = async (id, field, method) => {
  const profile = await Profile.findOneAndUpdate(
    { user: id },
    { [method]: field },
    { new: true }
  );
  return profile;
};

const removeService = async (id, serv_id) => {
  const profile = await getById(id);
  // Get remove index
  const removeIndex = profile.services.map(item => item.id).indexOf(serv_id);

  profile.services.splice(removeIndex, 1);

  await profile.save();

  return profile;
};

module.exports = { getById, getAll, update, removeService, create, getByField };
