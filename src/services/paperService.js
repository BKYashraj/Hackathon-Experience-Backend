const productRepository = require('../repositories/paperRepository');
const fs = require("fs/promises"); // To delete the file after uploading
const { findProductById, deleteProductById } = require("../repositories/paperRepository");

async function createProduct(productDetails) {
  // Spread productDetails directly instead of nesting it
  console.log('----------------------------',productDetails)
  const product = await productRepository.createProduct({ ...productDetails });

  if (!product) {
    throw { reason: "Not able to create product", statusCode: 500 };
  }

  return product;
}

async function addProduct(productId) {
  const product = await findProductById(productId);
  if (product) return product;
  else throw { reason: "Not able to find product", statusCode: 500 };
}

async function getAllProductsData() {
  const products = await productRepository.getAllProducts();
  if (products) return products;
  else throw { reason: "Not able to find products", statusCode: 500 };
}

async function deleteProduct(productId) {
  const response = await deleteProductById(productId);
  if (response) return response;
  else throw { reason: "Product Not Found", statusCode: 500 };
}

module.exports = {
  createProduct,
  addProduct,
  deleteProduct,
  getAllProductsData
};
