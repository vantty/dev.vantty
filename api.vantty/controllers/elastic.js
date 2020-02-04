const elasticService = require("../services/elastic");

exports.load = async (req, res) => {
  try {
    const { allElasticId, imagesId } = req.body;
    let result = await elasticService.load(imagesId, allElasticId);
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Server Error"
    });
  }
};
