export default res => {
  const {
    bio,
    city,
    education,
    elasticId,
    instagramUsername,
    name,
    portfolioPictures,
    profession,
    profilePicture,
    reviewId,
    user,
    _id,
    verified
  } = res.data;
  let userId = "";
  if (user._id) {
    userId = user._id;
  } else {
    userId = user;
  }
  const profileId = _id;
  const data = {
    bio,
    city,
    education,
    elasticId,
    instagramUsername,
    name,
    portfolioPictures,
    profession,
    profilePicture,
    reviewId,
    userId,
    profileId,
    verified
  };
  return data;
};
