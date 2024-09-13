const { getHacks,getPapers } = require("../repositories/userRepository");
const { registerUser } = require("../services/userService");
async function createUser(req, res) {
  try {
    const response = await registerUser(req.body);
    return res.json({
      message: "Successfully registered the user",
      success: true,
      data: response,
      error: {},
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.reason,
      data: {},
      error: error,
    });
  }
}

async function getAllHacksOfUser(req, res) {
  try {
    const userId = req.params.id; // Extract the ID from req.params
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
        data: {},
        error: {},
      });
    }

    const response = await getHacks(req.user, { id: userId }); // Pass the user and params to getHacks
    return res.json({
      message: "Successfully fetched Hacks",
      success: true,
      data: response,
      error: {},
    });
  } catch (error) {
    // Ensure statusCode is defined and valid
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "An error occurred",
      data: {},
      error: error,
    });
  }
}

async function getAllPapersOfUser(req, res) {
  try {
    const userId = req.params.id; // Extract the ID from req.params
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
        data: {},
        error: {},
      });
    }

    const response = await getPapers(req.user, { id: userId }); // Pass the user and params to getHacks
    return res.json({
      message: "Successfully fetched Research Papers",
      success: true,
      data: response,
      error: {},
    });
  } catch (error) {
    // Ensure statusCode is defined and valid
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "An error occurred",
      data: {},
      error: error,
    });
  }
}

module.exports = {
  createUser,
  getAllHacksOfUser,
  getAllPapersOfUser
};
