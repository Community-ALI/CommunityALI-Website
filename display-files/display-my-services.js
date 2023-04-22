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
const Services = models.Services;
// file system allows the server to read html from the client. I think?
const fs = require('fs');
const { application } = require('express');

// each individual application to display
const SearchResult = function(props) {
  const applicant = props.applicant;
  if (applicant.service == props.service.title){
  return React.createElement(
    "div",
    { className: "result-container" },
    React.createElement("p", { className: "applicant-name" }, applicant.name),
    React.createElement("p", { className: "applicant-w_number" }, applicant.w_number),
    React.createElement("p", { className: "applicant-email" }, applicant.email)
  );
  }
  else{
    return undefined
  }
};

// create the information required to display the page
const my_service_page_display = function(props) {
  const service = props.service;
  html = React.createElement("div", { className: "user-service" }, 
      
      React.createElement("div", { className: "option-container-service" }, 
          React.createElement("a", { className: "user-link ", href: "service-edit?service="+service.title }, 
              React.createElement("i", { className: "fa-solid fa-pen-to-square fa-2x" })
          ),

          React.createElement("a", { className: "user-link ", href: "applicants.html" }, 
              React.createElement("i", { className: "fa-solid fa-users fa-2x" })
          ),

          React.createElement("p", { className: "user-service-text" }, service.title)
      )
    )
  return html
};

// access database, call functions, display page
const display_all_my_services = function (req, res, token) {
  var username = token.username
  // get database
  Services.find(async function(err, foundServices){
    if(!err){
      
      // perform the search
      var filteredServices = [];
      for (service of foundServices){
        if (service.user == username){
          filteredServices.push(service);
        }
        else{
        }
      }

      let newDivContent = ReactDomServer.renderToString(React.createElement("div", { className: "username-title"}, 
      "Welcome " + username
      )
      );
      newDivContent += ReactDomServer.renderToString(
        React.createElement("div", {className: "user-service"},
        React.createElement("a", { className: "user-link", href: "service-create.html" }, 
            React.createElement("div", { className: "option-container" }, 
                React.createElement("i", { className: "fa-solid fa-plus fa-2x" }), 
                React.createElement("p", { className: "user-service-text" }, " Add a New Service")
            )
        )))
      for (service of filteredServices){
        newDivContent += ReactDomServer.renderToString(React.createElement(my_service_page_display, {service: service }));
      }
      res.send(newDivContent);
      };
  });
}

// export to app.js 
module.exports = display_all_my_services;