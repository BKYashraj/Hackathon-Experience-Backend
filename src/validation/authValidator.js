const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");

async function isLoggedIn(req, res, next) {
  const token = req.cookies["authToken"]; // get the token from cookie

  console.log(token);

  // if token is not provided, then user is not authenticated
  if (!token) {
    return res.status(401).json({
      success: false,
      data: {},
      error: "Not authenticated",
      message: "No Auth Token provided",
    });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET); // verify the token with secret key

    console.log(decoded, decoded.exp, Date.now() / 1000);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        data: {},
        error: "Not authenticated",
        message: "Invalid Token provided",
      });
    }

    // if reached here, then user is authenticated allow them to access the api

    req.user = {
      email: decoded.email,
      id: decoded.id,
      role: decoded.role,
    };

    next(); // move to next middleware
  } catch (error) {
    console.log(error.name);
    if (error.name === "TokenExpiredError") {
      res.cookie("authToken", "", {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 0,
      });
      return res.status(200).json({
        success: true,
        message: "Log out successfull",
        error: {},
        data: {},
      });
    }
    return res.status(401).json({
      success: false,
      data: {},
      error: error,
      message: "Invalid Token provided",
    });
  }
}

module.exports = {
  isLoggedIn,
  // isAdmin,
};