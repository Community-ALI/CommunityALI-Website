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

// require js modules
const display_services = require("./display-files/display-services");
const display_all_applications = require("./display-files/display-all-applications");
const store_application = require("./display-files/store-application");
const display_application_page = require("./display-files/display-application-page")

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
  display_services(req, res);
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