export default (auth, user) => {
  console.log(auth);
  if (auth.isAuthenticated) {
    if (auth.loading === false) {
      if (auth.user._id === user) {
        return true;
      } else if (auth.user.role === "Admin") {
        return true;
      }
    }
  }
  return false;
};
