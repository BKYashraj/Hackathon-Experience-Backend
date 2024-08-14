const { findUser, createUser } = require("../repositories/userRepository");

async function registerUser(userDetails) {
  // It will create a brand new user in the db

  // 1. We need to check if the user with this email and mobile number already exists or not

  const user = await findUser({
    email: userDetails.email,
    mobileNumber: userDetails.mobileNumber,
  });

  // 2. If the user exists, then we will throw an error
  if (user) {
    throw {
      reason: "User with the given email and mobile number already exist",
      statusCode: 400,
    };
  }

  // 3. If the user does not exist, then we will create a new user
  const newUser = await createUser({
    email: userDetails.email,
    password: userDetails.password,
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    mobileNumber: userDetails.mobileNumber,
  });

  if (!newUser) {
    throw {
      reason: "Something went wrong, cannot create user",
      statusCode: 500,
    };
  }

  // 3. retuern the details of created user
  return newUser;
}

module.exports = {
  registerUser,
};
