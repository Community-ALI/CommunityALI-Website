// FILE OVERVIEW:

//react modules
var React = require('react');
var ReactDomServer = require('react-dom/server');

// database
const models = require("../connect-to-database");
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

      res.setHeader("Access-Control-Allow-Origin", "http://localhost:8081");
      res.json({
        dataServices: filteredServices,
        tokenUsername: username});
    }
  });
}

// export to app.js 
module.exports = display_all_my_services;