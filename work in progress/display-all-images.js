// FILE OVERVIEW:
// this is a dev tool, and should be commented out in app.js when not on localhost
// this file is not accessable through the website unless you type in the right url
// The purpose of this file is to easilly sort through applications based on service

//react modules
var React = require('react');
var ReactDomServer = require('react-dom/server');

// database
const models = require("../define-database-models");
const Image = models.Image;

// file system allows the server to read html from the client. I think?
const fs = require('fs');

// each individual image to display
const SearchResult = function(props) {
  const imagesObject = props.imagesObject;
  const imageData = imagesObject.data.toString('base64');
  const imageSrc = `data:${imagesObject.contentType};base64,${imageData}`;
  return React.createElement(
    "div",
    { className: "result-container" },
    React.createElement("p", { className: "applicant-name" }, imagesObject.name),
    React.createElement("img", { 
      className: "applicant-image", 
      src: imageSrc, 
      alt: imagesObject.name 
    })
  );
};

// create the information required to display the page
const image_page_display = function(props) {
  const results = props.results;
  return React.createElement(
    "div",
    { className: "search-results" },
    results.map(function(imagesObject) {
      return React.createElement(SearchResult, {
        imagesObject: imagesObject,
        key: imagesObject.title,
      });
    })
  );
};

// access database, call functions, display page
const display_all_applications =  function (req, res) {
  var service_name = req.query.service;
  var filter = req.query.filter;

  // get database
  Image.find(function(err, foundServices){
    if(!err){
      

      fs.readFile('public/services.html', 'utf-8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        // data now contains the contents of the file
        var html = ReactDomServer.renderToString(React.createElement(image_page_display, { results: foundServices }));
        let divToReplace = '<div class ="results"></div>';
        let newDivContent = '<div id="target">' + html + '</div>';

        let newData = data.replace(divToReplace, newDivContent);

        res.send(newData);

        });
      };
  });
}

// export to app.js 
module.exports = display_all_applications;