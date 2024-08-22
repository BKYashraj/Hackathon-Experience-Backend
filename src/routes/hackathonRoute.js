const express = require("express");
const {
  insertProduct,
  getProduct,
  deleteProducts,
  getProducts,
} = require("../controllers/hackathonController");
const uploader = require("../middlewares/multerMiddleware");
// const { isLoggedIn, isAdmin } = require("../validation/authValidator");
const { isLoggedIn } = require("../validation/authValidator");
const hackathonRouter = express.Router();

hackathonRouter.post(
  "/",
  isLoggedIn, // Middleware Called
  // isAdmin,  // Middleware Called
  uploader.single("winningPhoto"),
  insertProduct
);

hackathonRouter.get("/:id",isLoggedIn, getProduct);

hackathonRouter.get("/", getProducts);

hackathonRouter.delete("/:id",isLoggedIn, deleteProducts);

module.exports = hackathonRouter;
