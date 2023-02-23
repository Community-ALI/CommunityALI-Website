// get express (needed for server)
const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  next();
});
// require path
const path = require('path');

// allow the client to transfer data
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
const multer = require('multer');
const upload = multer();

//react modules
var React = require('react');
var ReactDomServer = require('react-dom/server');

// require js modules
const database_search = require("./database-search.js");
const display_services = require("./display-files/display-services");
const display_all_applications = require("./display-files/display-all-applications");
const store_application = require("./display-files/store-application");
const display_application_page = require("./display-files/display-application-page")
// fire when an application form is submitted
app.post('/send-application', upload.none(), function (req, res) {
    store_application(req, res);
  });

// send user to index page when they search our website url
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/service-search", function (req, res) {
  display_services(req,res);
});

// Display the apply for service page
app.get("/apply-for-service", function (req, res) {
  display_application_page(req,res);
});


// see aplications: this is currently meant for devs only
// TODO: make (part of) this accessible to logged in people
app.get("/Applications", function (req, res) {
  display_all_applications(req, res);  
});

let port = process.env.PORT; 
if ( port == null || port == ""){
  port = 3000;
}

app.listen(port, function(){
    console.log("Server is running on port 3000");
});