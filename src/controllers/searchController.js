const Product = require("../schema/hackathonSchema");
async function getSearch(req, res) {
  try {
    const userId = req.params.id.toLowerCase(); 
    const response = await Product.find(
      {
        "$or": [
          { "hackathonName": { "$regex": userId, "$options": "i" } },
          { "title": { "$regex": userId, "$options": "i" } },
          { "themeOrDomain": { "$regex": userId, "$options": "i" } },
          { "category": { "$regex": userId, "$options": "i" } },
          { "mentorName": { "$regex": userId, "$options": "i" } },
          { "collegeName": { "$regex": userId, "$options": "i" } },
        ]
      }
    )

    return res.status(200).json({
      success: true,
      message: "Search fetched successfully",
      data: response,
      error: {}
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      success: false,
      message: error.reason,
      data: {},
      error: error
    });
  }
}

module.exports = {
  getSearch
};