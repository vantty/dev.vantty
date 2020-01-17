export default (resImages, resProfile) => {
  const { name, profilePicture, user, _id, verified, price } = resProfile.data;
  let userId = "";
  if (user._id) {
    userId = user._id;
  } else {
    userId = user;
  }
  let profileId = _id;

  resImages.map(pic => {
    pic.profileId = profileId; //profile
    pic.userId = userId; //images
    pic.verified = verified; //profile
    pic.profilePicture = profilePicture; //profile
    pic.name = name; //profile
    pic.price = price; //profile
    pic.pictureId = pic._id;
    delete pic._id;
    return pic;
  });
  // const data = resImages;
  return resImages;
};
