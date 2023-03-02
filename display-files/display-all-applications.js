// FILE OVERVIEW:
// this is a dev tool, and should be commented out in app.js when not on localhost
// this file is not accessable through the website unless you type in the right url
// The purpose of this file is to easilly sort through applications based on service

//react modules
var React = require('react');
var ReactDomServer = require('react-dom/server');

// database
const models = require("../define-database-models");
const Application = models.Application;

// file system allows the server to read html from the client. I think?
const fs = require('fs');

// each individual application to display
const SearchResult = function(props) {
  const service = props.service;
  return React.createElement(
    "div",
    { className: "result-container" },
    React.createElement("p", { className: "applicant-name" }, service.name),
    React.createElement("p", { className: "applicant-w_number" }, service.w_number),
    React.createElement("p", { className: "applicant-email" }, service.email),
    React.createElement("p", { className: "applicant-service" }, service.service)
  );
};

// create the information required to display the page
const application_page_display = function(props) {
  const results = props.results;
  return React.createElement(
    "div",
    { className: "search-results" },
    React.createElement('a', { href: 'Applications?service=MJC Math and Engineering Club' }, "MJC Math and Engineering Club ----- "),
    React.createElement('a', { href: 'Applications?service=MJC MANRRS Club' }, "MJC MANRRS Club ----- "),
    React.createElement('a', { href: 'Applications?service=MJC Computer Science Club' }, "MJC Computer Science Club ----- "),
    React.createElement('a', { href: 'Applications?service=Community Catalyst Team' }, "Community Catalyst Team -----"),
    React.createElement('a', { href: 'Applications?service=MJC Young Farmers Club' }, "MJC Young Farmers Club"),
    results.map(function(service) {
      
      return React.createElement(SearchResult, {
        service: service,
        key: service.title,
      });
    })
  );
};

// access database, call functions, display page
const display_all_applications =  function (req, res) {
  var service_name = req.query.service;
  var filter = req.query.filter;

  // get database
  Application.find(function(err, foundServices){
    if(!err){
      
      // perform the search using the keyword and filter
      var filteredData = [];
      for (service of foundServices){
        if (service.service == service_name){
          filteredData.push(service);

        }
      }
      //res.render(service_page_display({ results: filteredData }));
      // res.sendFile(__dirname +'/public/index.html')
      fs.readFile('public/services.html', 'utf-8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        // data now contains the contents of the file
        var html = ReactDomServer.renderToString(React.createElement(application_page_display, { results: filteredData }));
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