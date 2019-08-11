exports.Name = user => {
  if (user && user.hasOwnProperty("google")) {
    return user.google.firstName;
  } else if (user && user.hasOwnProperty("local")) {
    return user.local.firstName;
  } else if (user && user.user.hasOwnProperty("facebook")) {
    return user.facebook.firstName;
  } else {
    return null;
  }
};
