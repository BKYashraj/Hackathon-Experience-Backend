const cloudinary = require("../config/cloudinaryConfig");
const productRepository = require('../repositories/paperRepository');
const fs = require("fs/promises"); // To delete the file after uploading
const { findProductById, deleteProductById, createPaper, getAllResearch } = require("../repositories/paperRepository");

async function createProduct(productDetails) {
  // 1. We should check if an image is coming to create the product, then we should first upload it on
  // cloudinary
  // console.log("Yahraj jjjjjjjj",productDetails);
  const imagePath = productDetails.winningPhoto;
  if (imagePath) {
    try {
      console.log("Desale",imagePath);
      const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
      // console.log(cloudinaryResponse);
      var productImage = cloudinaryResponse.secure_url;
      await fs.unlink(imagePath);
    } catch (error) {
      console.log(error);
      throw { reason: "Not able to create product", statusCode: 500 };
    }
  }

  // 2. Then use the url from cloudinary and other propduct details to add product in db

  const product = await createPaper({
    ...productDetails,
    winningPhoto: productImage,
  });

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
  const products = await getAllResearch();
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
