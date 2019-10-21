const express = require("express"),
  passport = require("passport"),
  passportConfig = require("../config/passport"),
  passportJWT = passport.authenticate("jwt", { session: false }),
  {
    deleteImages,
    addImages,
    addPortfolio,
    imagesById,
    current,
    deleteImageMongo,
    addPictureTags
  } = require("../controllers/images"),
  router = express.Router();

router.post("/add", addImages);
router.post("/delete", deleteImages);

router.get("/:id", imagesById);

router.delete("/user-pictures/:id/:image_id", passportJWT, deleteImageMongo);

router.get("/", passportJWT, current);

router.post("/add-tags", passportJWT, addPictureTags);

router.put("/portfolio", passportJWT, addPortfolio);

module.exports = router;
