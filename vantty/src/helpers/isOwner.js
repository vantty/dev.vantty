// export default (auth, user) => {
//   if (auth.isAuthenticated) {
//     if (auth.loading === false) {
//       if (auth.user._id === user) {
//         return true;
//       } else if (auth.user.role === "Admin") {
//         return true;
//       }
//     }
//   }
//   return false;
// };

export default (currentUser, commentId) => {
  const {
    user: { _id: currentUserId, role }
  } = currentUser;
  if (currentUserId === commentId || role === "Admin") {
    return true;
  } else {
    return false;
  }
};
