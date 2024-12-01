const express = require("express");

const { isLoggedIn } = require("../validation/authValidator");
const { getSearch } = require("../controllers/searchController");
const searchRouter = express.Router();

searchRouter.get(
  "/:id",
  isLoggedIn, // Middleware Called
  getSearch
);

module.exports = searchRouter;
