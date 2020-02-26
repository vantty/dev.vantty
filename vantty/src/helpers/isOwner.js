export default (currentUser, commentId) => {
  if (currentUser.isAuthenticated) {
    const {
      user: { _id: currentUserId, role }
    } = currentUser;
    if (currentUserId === commentId || role === "Admin") {
      return true;
    } else {
      return false;
    }
  }
  return false;
};
