const HackathonExperience = require("../schema/hackathonSchema");
const ResearchExperience = require("../schema/paperSchema");
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
  console.log("Fetching hack for user eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee ID:", userId);
    try {
      const listings = await HackathonExperience.find({ userRef: userId });
      return listings;
    } catch (error) {
      console.error("Error in getHacks:", error); // Log the error
      throw new Error("Failed to fetch hacks");
    }

}

async function getPapers(userDetails, params) {
  const userId = params.id;
  console.log("Fetching papers for user eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee ID:", userId);
  
  try {
    // Ensure you're checking the correct field (userRef) in the ResearchExperience schema
    const list = await ResearchExperience.find({ userRef: userId });
    if (!list || list.length === 0) {
      console.log(`No papers found for user ID: ${userId}`);
      return [];
    }
    // console.log("list is ::::::::::::::::::",list)
    return list;
  } catch (error) {
    console.error("Error in getPapers:", error); // Update error log for clarity
    throw new Error("Failed to fetch research papers");
  }
}

module.exports = {
  findUser,
  createUser,
  getHacks,
  getPapers
};
