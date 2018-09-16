const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const exphbs = require('express-handlebars'),


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.engine("handlebars", exphbs({defaultLayout:"main"}));

app.use(express.static("public"));

const config = require("./config/database");
mongoose.Promise = Promise;
mongoose.connect(config.database)
  .then(result => {
    console.log(`Connected to database '${result.connections[0].name}' on ${result.connections[0].host}:${result.connections[0].port}`);
  })
  .catch(err => console.log('There was an error with your connection:', err));

require('./controllers/index')(app),
require('./controllers/notes')(app),
require('./controllers/articles')(app),
require('./controllers/scrape')(app);


//start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});