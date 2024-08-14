const { createProduct, addProduct, deleteProduct, getAllProductsData } = require("../services/hackathonService");

async function insertProduct(req, res){
  try {
    const product = await createProduct({
      hackathonName: req.body.hackathonName,
      title: req.body.title,
      themeOrDomain: req.body.themeOrDomain,
      category: req.body.category,
      mentorName: req.body.mentorName,
      winningPhoto: req.file?.path,  // ? is added because if file present then it works but if file means image not present it does not show error it works without image
      teamMembersNames: req.body.teamMembersNames,
      techStack: req.body.techStack,
      overallExperience: req.body.overallExperience,
      challenges: req.body.challenges,
      highlights: req.body.highlights,
      keyTipsForJuniors: req.body.keyTipsForJuniors,
      projectDemoLink: req.body.projectDemoLink,
    });
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
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

async function getProduct(req, res) {
  try {
    const response = await addProduct(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
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

async function getProducts(req, res) {
  try {
    const response = await getAllProductsData();
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
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

async function deleteProducts(req, res) {
  try {
    const response = await deleteProduct(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
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
  insertProduct,
  getProduct,
  deleteProducts,
  getProducts
};