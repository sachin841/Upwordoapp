const express = require('express')


const mongoose = require('mongoose');
const { Mongo_URL, port } = require('./src/Config/mongodb');
const { Userrouter} = require('./src/modules/user/user.route');
const  bodyParser = require('body-parser');
const { Storyrouter } = require('./src/modules/story/story.route');
const { registerRoutes } = require('./src/routes');

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true,}))

registerRoutes(app)

mongoose.connect(Mongo_URL).then(()=>{
  console.log("mongoo db aare connected");
  
})


app.listen(port,()=>{
  console.log(`ap is listenuu ${port}`);
  
})