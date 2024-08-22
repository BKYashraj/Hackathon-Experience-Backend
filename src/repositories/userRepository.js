const HackathonExperience = require("../schema/hackathonSchema");
const User = require("../schema/userSchema");


async function findUser(parameters) {
  try {
    const response = await User.findOne({ ...parameters });
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function createUser(userDetails) {
  try {
    const response = await User.create(userDetails);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getHacks(userDetails, params) {
  const userId = params.id;

    try {
      const listings = await HackathonExperience.find({ userRef: userId });
      return listings;
    } catch (error) {
      console.error("Error in getHacks:", error); // Log the error
      throw new Error("Failed to fetch hacks");
    }

}


module.exports = {
  findUser,
  createUser,
  getHacks
};
