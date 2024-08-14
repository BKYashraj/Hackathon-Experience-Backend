const { createProduct, addProduct, deleteProduct, getAllProductsData } = require("../services/paperService");

async function insertProduct(req, res) {
  try {
    const product = await createProduct({
      hackathonName: req.body.hackathonName,
      title: req.body.title,
      themeOrDomain: req.body.themeOrDomain,
      category: req.body.category,
      mentorName: req.body.mentorName,
      winningDocument: req.body.winningDocument,  
      teamMembersNames: req.body.teamMembersNames,
      techStack: req.body.techStack,
      overallExperience: req.body.overallExperience,
      challenges: req.body.challenges,
      highlights: req.body.highlights,
      keyTipsForJuniors: req.body.keyTipsForJuniors,
    });
    
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
      error: {}
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.reason || "An error occurred while creating the product.",
      data: {},
      error: error
    });
  } 
}

// Other controller methods remain unchanged
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
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.reason || "An error occurred while fetching the product.",
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
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.reason || "An error occurred while fetching the products.",
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
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.reason || "An error occurred while deleting the product.",
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
