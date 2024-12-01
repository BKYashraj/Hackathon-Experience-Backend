const Product = require("../schema/hackathonSchema");
async function getSearch(req, res) {
  try {
    const userId = req.params.id; 
    const response = await Product.find(
      {
        "$or": [
          { "hackathonName": { "$regex": req.params.id}},
          { "title": { "$regex": req.params.id}},
          { "themeOrDomain": { "$regex": req.params.id}},
          { "category": { "$regex": req.params.id}},
          { "mentorName": { "$regex": req.params.id}},
          { "collegeName": { "$regex": req.params.id}},
          { "teamMembersNames": { "$regex": req.params.id}},
          { "techStack": { "$regex": req.params.id}},  
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