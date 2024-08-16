const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const ServerConfig = require('./config/serverConfig')
const connectDB = require('./config/dbConfig')
const User = require('./schema/UserSchema')
const userRouter = require('./routes/userRoute')
const authRouter = require('./routes/authRoute')
const { isLoggedIn } = require('./validation/authValidator')
const uploader = require('./middlewares/multerMiddleware')
const hackathonRouter = require('./routes/hackathonRoute')
const paperRouter = require('./routes/paperRoute')
const cors = require('cors');

const app = express()

// origin: 

app.use(cors({
  origin: ServerConfig.ORIGIN_LINK,
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
}));

// If request is in JSON, text, urlencoded it correctly reads by Express Server
// deserialiser
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded());
app.use(cookieParser());// to access cookie by server when any service call server

// Routing middleware
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/hackathon', hackathonRouter);
app.use('/paper', paperRouter);

app.post('/ping', isLoggedIn,(req, res) => {
  console.log(req.body);
  console.log('Auth Token:', req.cookies);
  return res.json({message: 'pong'});
})

app.post('/papers', uploader.single('incomingFile'),(req, res) => {
  return res.json({message: 'ok'});
});

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

