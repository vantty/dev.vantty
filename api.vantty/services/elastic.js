const imageService = require("./image");

const load = async (imagesId, allElasticId) => {
  const images = await imageService.getByImagesId(imagesId);
  let pictures = images.pictures;
  const arr = Array.from(pictures);
  const arr2 = Array.from(allElasticId);
  for (const x of arr) {
    for (const y of arr2) {
      if (x._id == y._id) {
        x.elasticId = y.elasticId;
        x.tag = y.tag;
      }
    }
  }

  await images.save();
  return images;
};
module.exports = { load };
