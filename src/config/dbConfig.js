const mongoose = require('mongoose')
const serverConfig = require('./serverConfig')

// The below function helps us to connect to a mongodb server

async function connectDB(){
  try {
    await mongoose.connect(serverConfig.DB_URL)
    console.log('DB Connected...');
  } catch (error) {
    console.log('DB Not Connected Error...');
    console.log(error);   
  }
}

module.exports = connectDB;
