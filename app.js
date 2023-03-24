//Require the neccesary libraries and modules 

// set up express
const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  next();
});

// allow the client to transfer data
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
const multer = require('multer');
const upload = multer();

<<<<<<< Updated upstream
// require js modules
const display_services = require("./display-files/display-services");
const display_all_applications = require("./display-files/display-all-applications");
const store_application = require("./display-files/store-application");
const display_application_page = require("./display-files/display-application-page")
=======
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const display_services = require("./database-files/display-services");
const display_all_applications = require("./database-files/display-all-applications");
const display_application_page = require("./database-files/display-application-page");

const store_application = require("./database-files/store-application");
const store_service = require("./database-files/store-service");
const store_images = require("./store-image");


const models = require("./database-files/define-database-models");
const User = models.User;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const session = require('express-session')
const JWT_SECRET = process.env.JWT_SECRET;
const SESSION_SECRET = process.env.SESSION_SECRET;
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))


>>>>>>> Stashed changes

// Routing functions
// send user to index page when they search our website url
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// Store user form data from an application in the database
app.post('/send-application', upload.none(), function (req, res) {
    store_application(req, res);
  });

// Display services from the database to the user when they go to the service-search page
app.get("/service-search", function (req, res) {
<<<<<<< Updated upstream
  display_services(req, res);
=======
    display_services(req, res);
>>>>>>> Stashed changes
});

// Display data on the selected service when the user goes to the apply-for-service page
app.get("/apply-for-service", function (req, res) {
  display_application_page(req,res);
});


// View aplications: this is currently meant for devs only
// TODO: make (part of) this accessible to logged in people
app.get("/Applications", function (req, res) {
  display_all_applications(req, res);  
});


// Server configuration
let port = process.env.PORT; 
if ( port == null || port == ""){
  port = 3000;
}

app.listen(port, function(){
    console.log("Server is running on port 3000");
});