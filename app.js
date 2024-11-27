const express = require('express');
const ejs = require('ejs');
const app = express();
const userRoutes = require('./routes/users.js');
require('dotenv').config();
const PORT = process.env.PORT || 8080;

//Setting up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//Using express.Router() to organize routes
app.use(userRoutes);

//Serves static files in public folder
app.use(express.static('public'));

//This will start our server
app.listen(PORT, ()=>{
  console.log(`Connected to port ${PORT}`);
});
