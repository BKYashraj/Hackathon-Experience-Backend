const express = require('express');
const {createUser, getAllHacksOfUser, getAllPapersOfUser} = require('../controllers/userController');
const { isLoggedIn } = require('../validation/authValidator');

const userRouter = express.Router();

userRouter.post('/', createUser);

userRouter.get("/hacks/:id", getAllHacksOfUser);

userRouter.get("/papers/:id", getAllPapersOfUser);

module.exports = userRouter;