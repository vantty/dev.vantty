export default res => {
  const {
    name,
    portfolioPictures,
    profilePicture,
    user,
    verified,
    price
  } = res.data;
  let userId = "";
  if (user._id) {
    userId = user._id;
  } else {
    userId = user;
  }

  portfolioPictures.map(pic => {
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
