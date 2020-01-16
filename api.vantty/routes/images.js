const express = require("express"),
  passport = require("passport"),
  passportConfig = require("../config/passport"),
  passportJWT = passport.authenticate("jwt", { session: false }),
  {
    getByUser,
    getById,
    saveCloud,
    save,
    deleteImages,
    deleteImageMongo,
    addPictureTags,
    notification
  } = require("../controllers/images"),
  router = express.Router();

router.get("/", passportJWT, getByUser);
router.get("/:id", getById);
router.post("/cloud", saveCloud);
router.put("/", passportJWT, save);
// =====
router.post("/delete", deleteImages);
router.post("/notification", notification);
router.delete("/user-pictures/:id/:image_id", passportJWT, deleteImageMongo);
router.post("/add-tags", passportJWT, addPictureTags);

module.exports = router;
