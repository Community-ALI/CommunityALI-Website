// get express (needed for server)
const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));


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
mongoose.connect("mongodb+srv://Ben:test123@cluster0.hcq9y6f.mongodb.net/application-DB", {useNewUrlParser: true});

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
  startTime: String,
  date: String,
  description: String
}

// connect to a specific part of the database (application-DB.applications)
const Application = mongoose.model("applications", applicationSchema);
const Services = mongoose.model("services", serviceSchema);
// require js modules
var database_search = require('./database-search.js');
var service_page_display = require("./service-page-display");
var application_page_display = require("./application-page-display");
// fire when an application form is submitted
app.post("/apply-for-service", function (req,res) { // FIXME: change application-create to the name of the application form
    console.log('posting service');
    // create json data from form
    console.log(req.query.service);
    const apply = new Application({
      service: req.query.service,
      name: req.query.name,
      email: req.query.email,
      w_number: req.query.w_number
    });
    // save json data to the database
    apply.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('nice');
        res.sendFile(__dirname + "/public/signup-success.html");
      }
    });
  });



app.route('/Services')
.get(function(req, res) {
  Services.find(function(err, foundServices){
  if(!err){
    console.log(foundServices[0].title);
    res.send(foundServices);
  } else{
    res.send(err); 
  }
  }); 
})

// send user to index page when they search our website url
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/service-search", function (req, res) {
  var keyword = req.query.keyword;
  var filter = req.query.filter;

  // get database
  Services.find(function(err, foundServices){
    if(!err){
      console.log(foundServices[0].title);
      
      // perform the search using the keyword and filter
      filteredData = foundServices;
      //res.render(service_page_display({ results: filteredData }));
      // res.sendFile(__dirname +'/public/index.html')
      fs.readFile('public/services.html', 'utf-8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        // data now contains the contents of the file
        var html = ReactDomServer.renderToString(React.createElement(service_page_display, { results: filteredData }));
        let divToReplace = '<div class ="results"></div>';
        let newDivContent = '<div id="target">' + html + '</div>';

        let newData = data.replace(divToReplace, newDivContent);

        res.send(newData);

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


// listen on port 3000 
app.listen(3000, function(){
    console.log("Server is running on port 3000");
});