export default user => {
  if (user && user.hasOwnProperty("google")) {
    return user.google;
  } else if (user && user.hasOwnProperty("local")) {
    return user.local;
  } else if (user && user.hasOwnProperty("facebook")) {
    return user.facebook;
  } else {
    return undefined;
  }
};
