const Product = require("../schema/paperSchema");

async function createPaper(productDetails) {
  try {
    const response = await Product.create(productDetails);
    return response;
  } catch (error) {
    console.error("Error creating product:", error);
    throw { reason: "Error creating product", statusCode: 500 }; // Added error handling
  }
}

async function findProductById(productId) {
  try {
    const response = await Product.findById(productId);
    return response;
  } catch (error) {
    console.error("Error finding product by ID:", error);
    throw { reason: "Product not found", statusCode: 404 }; // Added error handling
  }
}

async function getAllProducts() {
  try {
    const products = await Product.find({});
    return products;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw { reason: "Error fetching products", statusCode: 500 }; // Added error handling
  }
}

async function deleteProductById(productId) {
  try {
    const response = await Product.findByIdAndDelete(productId);
    if (!response) {
      throw { reason: "Product not found", statusCode: 404 };
    }
    return response;
  } catch (error) {
    console.error("Error deleting product by ID:", error);
    throw { reason: "Error deleting product", statusCode: 500 }; // Added error handling
  }
}

module.exports = {
  createPaper,
  findProductById,
  deleteProductById,
  getAllProducts,
};
