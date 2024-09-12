const express = require("express");
const {
  insertProduct,
  getProduct,
  deleteProducts,
  getProducts,
} = require("../controllers/paperController");
const { isLoggedIn } = require("../validation/authValidator");
const uploader = require("../middlewares/multerMiddleware");

const paperRouter = express.Router();

paperRouter.post(
  "/",
  isLoggedIn, 
  uploader.single("winningPhoto"),
  insertProduct
);

paperRouter.get("/:id", getProduct);

paperRouter.get("/", getProducts);

paperRouter.delete("/:id", deleteProducts);

module.exports = paperRouter;
