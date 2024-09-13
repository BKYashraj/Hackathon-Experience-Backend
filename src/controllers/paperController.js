const { addProduct, deleteProduct, getAllProductsData, createProduct } = require("../services/paperService");

async function insertProduct(req, res) {
  // console.log("Yashrajjjjjjjjjjjjjjjj")
  try {
    // console.log("Yashrajjjjjjj",req.body.PaperTitle);
    const product = await createProduct({
      PaperTitle: req.body.PaperTitle,
      Domain: req.body.Domain,
      Abstract: req.body.Abstract,
      AuthorsNames: req.body.AuthorsNames,
      mentorName: req.body.mentorName, 
      InstituteName: req.body.InstituteName,
      JournalName: req.body.JournalName,
      overallExperience: req.body.overallExperience,
      keyTipsForJuniors: req.body.keyTipsForJuniors,
      Conclusion: req.body.Conclusion,
      winningPhoto: req.file?.path, 
      PaperLink: req.body.PaperLink,
      userRef: req.user.id,
    });

    // console.log("Yashraj Pravin Desale",product);
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
