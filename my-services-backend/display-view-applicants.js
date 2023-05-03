// FILE OVERVIEW:
// this is a dev tool, and should be commented out in app.js when not on localhost
// this file is not accessable through the website unless you type in the right url
// The purpose of this file is to easilly sort through applications based on service

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

//json web token
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;


// each individual application to display
const SearchResult = function(props) {
  const applicant = props.applicant;
  if (applicant.service == props.service.title){
  return React.createElement(
    "div",
    { className: "result-container" },
    React.createElement("p", { className: "applicant-name" }, applicant.name),
    React.createElement("p", { className: "applicant-email" }, applicant.email)
  );
  }
  else{
    return undefined
  }
};

// create the information required to display the page
const application_page_display = function(props) {
  const results = props.results;
  const service = props.service;
  return React.createElement(
    "section",
    { className: "applicants" },
    React.createElement("div", {className: "applicants-title"}, service.title),
    React.createElement('div', {className: "search-results"},
    results.map(function(applicant) {
      return React.createElement(SearchResult, {
        applicant: applicant,
        service: service,
        key: applicant.name,
      });
    })
  ))
};

// access database, call functions, display page
const display_all_applications = function (req, res, token) {
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
      // get applications
      var foundApplications = await Application.find({})
      var filteredApplications = [];
      // search through applications for services that 
      for (service of filteredServices){
        var service_name = service.title;
          
          for (apply of foundApplications){
            if (apply.service == service_name){
              filteredApplications.push(apply);
            }
          }
      }
      let newDivContent = ''
      for (service of filteredServices){
        newDivContent += ReactDomServer.renderToString(React.createElement(application_page_display, { results: filteredApplications.reverse(), service: service }));
      }
      res.send(newDivContent);
      };
  });
}


const display_view_applicants = function(req, res){
  try{
    if (req.headers.authorization != undefined){
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, JWT_SECRET);
      console.log('application request')
      display_all_applications(req, res, decodedToken);  
      console.log('applications sent')
    }
    else{
      console.log('error, login verification failed')
      res.send("error, login verification failed");
    }
    }
    catch (error){
      console.log(error)
      res.send("error");
    }
}
// export to app.js 
module.exports = display_view_applicants;