const { JWT_SECRET } = require("../config/serverConfig");
const User = require("../schema/userSchema");

const { loginUser } = require("../services/authService");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
// import { bcryptjs } from 'bcryptjs';

async function login(req, res) {
  try {
    const loginPayload = req.body;

    const response = await loginUser(loginPayload);

    // After User login, we send JWT token in the form of cookie to user, so next time when he use any functionality he send this cookie to server then server gives direct access to the user for that functionality.
    console.log("Response token is ", response.token);
    res.cookie("authToken", response.token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Successfully logged in",

      userData: response.userData,
      userRole: response.userRole,

      error: {},
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      data: {},
      error: error,
    });
  }
}

async function logout(req, res) {
  console.log("Cookie", req.cookies);
  console.log("logout");
  res.cookie("authToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message: "Successfully logged out",
    data: {},
    error: {},
  });
}
async function google(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (user) {
      if (user.avatar !== req.body.photo) {
        user.avatar = req.body.photo;
        await user.save(); // Save the updated user
      }
      const token = jwt.sign({ id: user._id }, JWT_SECRET);
      const { password: pass, ...rest } = user._doc; // Exclude password
      res
        .cookie("authToken", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({ ...rest, id: user._id }); // Include user ID in response
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        // firstName:
        //   req.body.name.split(" ").join("").toLowerCase() +
        //   Math.random().toString(36).slice(-4),
        firstName: req.body.name.split(" "),
        email: req.body.email.toLowerCase(),
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc; // Exclude password
      res
        .cookie("authToken", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({ ...rest, id: newUser._id }); // Include user ID in response
    }
  } catch (error) {
    console.log("Error is here", error);
    next(error);
  }
}


module.exports = {
  login,
  logout,
  google,
};
