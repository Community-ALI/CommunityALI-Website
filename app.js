
//Require the neccesary libraries and modules 
// set up express
const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow the client to transfer data
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const display_services = require("./display-files/display-services");
const display_all_applications = require("./display-files/display-all-applications");
const display_all_images = require("./display-files/display-all-images");
const display_application_page = require("./display-files/display-application-page");

const store_application = require("./display-files/store-application");
const store_images = require("./store-image");


// send user to index page when they search our website url
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// Store user form data from an application in the database
app.post('/send-application', upload.none(), function (req, res) {
    store_application(req, res);
  });

// test: this uploads images
app.post("/upload-files", upload.array("files"), uploadFiles);
function uploadFiles(req, res) {
  store_images(req, res)
}
// Display services from the database to the user when they go to the service-search page
app.get("/service-search", function (req, res) {
    display_services(req,res);
});

// display the sign up/apply for service page
app.get("/apply-for-service", function (req, res) {
  display_application_page(req,res);
});

// dev tools

// test: Display images from the database 
// app.get("/Images", function(req,res){
//   display_all_images(req, res);
// });

// // View aplications: this is currently meant for devs only
// // TODO: make (part of) this accessible to logged in people
// app.get("/Applications", function (req, res) {
//   display_all_applications(req, res);  
// });

// Server configuration
const port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log(`Server is running on port ${port}`);
});