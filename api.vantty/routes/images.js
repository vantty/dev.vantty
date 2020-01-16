const express = require("express"),
  passport = require("passport"),
  passportConfig = require("../config/passport"),
  passportJWT = passport.authenticate("jwt", { session: false }),
  {
    getByUser,
    getById,
    save,
    deleteImages,
    deleteImageMongo,
    addPictureTags
  } = require("../controllers/images"),
  router = express.Router();

router.get("/", passportJWT, getByUser);
router.get("/:id", getById);
router.post("/", passportJWT, save);
// =====
router.post("/delete", deleteImages);
router.delete("/user-pictures/:image_id", passportJWT, deleteImageMongo);
router.post("/add-tags", passportJWT, addPictureTags);

module.exports = router;
