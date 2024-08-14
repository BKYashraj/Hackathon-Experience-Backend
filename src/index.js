const express = require('express')
const bodyParser = require('body-parser')
const ServerConfig = require('./config/serverConfig')
const connectDB = require('./config/dbConfig')
const User = require('./schema/UserSchema')
const userRouter = require('./routes/userRoute')

const app = express()

// If request is in JSON, text, urlencoded it correctly reads by Express Server
// deserialiser
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded());

// Routing middleware
app.use('/users', userRouter);

app.post('/ping', (req, res) => {
  console.log(req.body);
  return res.json({message: 'pong'});
})

app.listen(ServerConfig.PORT, async () => {
  await connectDB();
  console.log(`Example app listening on port ${ServerConfig.PORT}...`)

  // For checking
  // const newUser = await User.create({
  //   email:'yashr@gmail.com',
  //   password: '12348677',
  //   firstName: 'yashraj',
  //   lastName:'dote',
  //   mobileNumber:'9768556744'
  // });
  // console.log(newUser);

  
})

