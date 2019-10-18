export default res => {
  const {
    name,
    portfolioPictures,
    profilePicture,
    user,
    _id,
    verified,
    price
  } = res.data;
  let userId = "";
  if (user._id) {
    userId = user._id;
  } else {
    userId = user;
  }
  let profileId = _id;

  portfolioPictures.map(pic => {
    pic.profileId = profileId;
    pic.picId = pic._id;
    pic.userId = userId;
    pic.verified = verified;
    pic.profilePicture = profilePicture;
    pic.name = name;
    pic.price = price;
    delete pic._id;
  });
  const data = portfolioPictures;
  return data;
};
