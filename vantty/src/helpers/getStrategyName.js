export default user => {
  if (user && user.hasOwnProperty("google")) {
    return `${user.google.firstName} ${user.google.lastName}`;
  } else if (user && user.hasOwnProperty("local")) {
    return `${user.local.firstName} ${user.local.lastName}`;
  } else if (user && user.hasOwnProperty("facebook")) {
    return `${user.facebook.firstName} ${user.facebook.lastName}`;
  } else {
    return undefined;
  }
};
