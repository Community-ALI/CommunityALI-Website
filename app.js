// get express (needed for server)
const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log(req.body);
  next();
});
// require path
const path = require('path');

// ...
const multer = require('multer');
const upload = multer();

// allow for client-like manipulation of HTML data
const domino = require('domino');

// allow the client to transfer data
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// fs allows the server to read html from the client. I think?
const fs = require('fs');

//react stuff
var React = require('react');
var ReactDomServer = require('react-dom/server');

// connect to database
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
// mongoose.connect("mongodb+srv://Ben:test123@cluster0.hcq9y6f.mongodb.net/application-DB", {useNewUrlParser: true});
mongoose.connect("mongodb+srv://Community_Catalyst:catalyst_2022@cluster0.parasjl.mongodb.net/test", {useNewUrlParser: true});
// create format for entering applications
const applicationSchema = {
    service: String,
    name: String,
    email: String,
    w_number: String
}
// create format for entering services
const serviceSchema = {
  title: String,
  author: String,
  author_role: String,
  photo: String,         // FIXME: make photo an image file not string
  details: Array,
  description: String,
  contacts: Array
}

// connect to a specific part of the database (application-DB.applications)
const Application = mongoose.model("applications", applicationSchema);
const Services = mongoose.model("services", serviceSchema);
// require js modules
var database_search = require('./database-search.js');
var service_page_display = require("./service-page-display");
var application_page_display = require("./application-page-display");
// fire when an application form is submitted
app.post('/send-application', upload.none(), function (req, res) {

    // create json data from form
    const apply = new Application({
      service: req.body.service,
      name: req.body.name,
      email: req.body.email,
      w_number: req.body.w_number
    });
    // save json data to the database
    apply.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        // display success page
        console.log('application success');
        res.send("/signup-success.html");
      }
    });
  });


// send user to index page when they search our website url
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/service-search", function (req, res) {
  var keyword = req.query.keyword;
  var filter = req.query.filter;

  // get database data
  Services.find(function(err, foundServices){
    if(!err){      
      // TODO: perform the search using the keyword and filter
      filteredData = foundServices;
      //res.render(service_page_display({ results: filteredData }));

      fs.readFile('public/services.html', 'utf-8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        // var "data" now contains the contents of the file
        var html = ReactDomServer.renderToString(React.createElement(service_page_display, { results: filteredData }));
        let divToReplace = '<div class ="results"></div>';
        let newDivContent = html

        let newData = data.replace(divToReplace, newDivContent);

        res.send(newData);
        });
      };

  
  });
});


app.get("/apply-for-service", function (req, res) {
  var selected_service = req.query.service;

  console.log(selected_service);
  // get database data
  Services.find(function(err, foundServices){
    if(!err){
      // find this exact service
      console.log('Found service:');
      var selected_service_json = 'ERROR: no service found'
      for (service of foundServices){
        if (service.title == selected_service) {
          selected_service_json = service;
        }
      }
      console.log(selected_service_json);
      

      fs.readFile('public/apply-for-service.html', 'utf-8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const window = domino.createWindow(data);
        // get the document from the window
        const document = window.document;
        // find the element with class "service-title" and set it to the title
        const title = document.querySelector('.service-title');
        title.innerHTML = selected_service_json.title;
        // find the element with class "service-picture" and set it to the image
        const image = document.querySelector('.service-picture');
        image.innerHTML = '<img class="MANRRS-picture" src ="../'+selected_service_json.photo+'"></img>' 

        // create details array
        detailsHTML = '<div class="service-author"></div><div class="service-header">Next Meeting Details</div>';
        for (detail of selected_service_json.details){
          detailsHTML+='<div>'
          detailsHTML+=detail;
          detailsHTML+='</div>'
        };
        // find the element with class "service-details" and set it to the service details
        const details = document.getElementById('service-details');
        details.innerHTML = detailsHTML;

        // find the element with class "service-author" and set it to the author
        const author = document.querySelector('.service-author');
        author.innerHTML = selected_service_json.author;

        // find the element with class "service-description" and set it to the description
        const description = document.querySelector('.service-description');
        description.innerHTML = selected_service_json.description;


        contactHTML = '<div class="service-author"></div><div class="service-header">Contact and Social Media</div>';
        for (contact of selected_service_json.contacts){
          contactHTML+='<div>'
          contactHTML+=contact;
          contactHTML+='</div>'
        };
        // find the element with ID "contact-container" and set it to the service details
        const contacts = document.getElementById('contact-container');
        contacts.innerHTML = contactHTML;

        // send the modified HTML to the client
        res.send(window.document.documentElement.outerHTML);
        });
      };

  
  });
});


// see aplications
// app.get("/Applications", function (req, res) {
//   var keyword = req.query.keyword;
//   var filter = req.query.filter;

//   // get database
//   Application.find(function(err, foundServices){
//     if(!err){
//       console.log(foundServices[0].name);
      
//       // perform the search using the keyword and filter
//       filteredData = foundServices;
//       //res.render(service_page_display({ results: filteredData }));
//       // res.sendFile(__dirname +'/public/index.html')
//       fs.readFile('public/services.html', 'utf-8', (err, data) => {
//         if (err) {
//           console.error(err);
//           return;
//         }
//         // data now contains the contents of the file
//         var html = ReactDomServer.renderToString(React.createElement(application_page_display, { results: filteredData }));
//         let divToReplace = '<div class ="results"></div>';
//         let newDivContent = '<div id="target">' + html + '</div>';

//         let newData = data.replace(divToReplace, newDivContent);

//         res.send(newData);

//         });
//       };

  
//   });
// });


let port = process.env.PORT; 
if ( port == null || port == ""){
  port = 3000;
}

app.listen(port, function(){
    console.log("Server is running on port 3000");
});