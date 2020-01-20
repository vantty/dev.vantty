const express = require("express"),
  passport = require("passport"),
  passportConfig = require("../config/passport"),
  passportJWT = passport.authenticate("jwt", { session: false }),
  {
    getByUser,
    getById,
    remove,
    save,
    saveTags
  } = require("../controllers/images"),
  router = express.Router();

router.get("/", passportJWT, getByUser);
router.get("/:id", getById);
router.post("/", passportJWT, save);
router.delete("/delete/:image_id/:cloud_id", passportJWT, remove);
router.post("/tags", passportJWT, saveTags);

module.exports = router;
