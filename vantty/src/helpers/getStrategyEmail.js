export default user => {
  if (user && user.hasOwnProperty("google")) {
    return user.google.email;
  } else if (user && user.hasOwnProperty("local")) {
    return user.local.email;
  } else if (user && user.hasOwnProperty("facebook")) {
    return user.facebook.email;
  } else {
    return undefined;
  }
};
