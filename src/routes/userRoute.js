const express = require('express');
const {createUser, getAllHacksOfUser} = require('../controllers/userController');
const { isLoggedIn } = require('../validation/authValidator');

const userRouter = express.Router();

userRouter.post('/', createUser);

userRouter.get("/hacks/:id", getAllHacksOfUser);

module.exports = userRouter;