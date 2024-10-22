const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportJWT = passport.authenticate("jwt", { session: false });
const {
  getByUser,
  getById,
  remove,
  save,
  saveTags,
  saveProfileImage
} = require("../controllers/images");

router.get("/", passportJWT, getByUser);
router.get("/:id", getById);
router.post("/", passportJWT, save);
router.post("/profile/:remove_cloud_id", passportJWT, saveProfileImage);
router.delete("/delete/:image_id/:cloud_id", passportJWT, remove);
router.post("/tags", passportJWT, saveTags);

module.exports = router;
