const express = require('express')
const bodyParser = require('body-parser')
const ServerConfig = require('./config/serverConfig')
const connectDB = require('./config/dbConfig')


const app = express()

// If request is in JSON, text, urlencoded it correctly reads by Express Server
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded());

app.post('/ping', (req, res) => {
  console.log(req.body);
  return res.json({message: 'pong'});
})

app.listen(ServerConfig.PORT, async () => {
  await connectDB();
  console.log(`Example app listening on port ${ServerConfig.PORT}...`)
})

