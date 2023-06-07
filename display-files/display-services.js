// // FILE OVERVIEW
// // this file takes services.html and adds all the services from the database to it
// // this file creates an href for each service so that it will bring the user to the right application page
// // then, it sends the file to be viewed by the client
// // Later, this will also require other files in order to sort and filter services

// var React = require('react');
// const fs = require('fs');
// var React = require('react');
// var ReactDomServer = require('react-dom/server');

// const models = require("../define-database-models");
// const Services = models.Services;

// const SearchResult = function(props) {
//   const service = props.service;
//    return React.createElement('div', { className: 'result-container', id: service.title},
//     React.createElement('div', { className: 'result-picture-container' },
//         React.createElement('img', { className: 'result-picture', src: service.photo })
//     ),
//     React.createElement('div', { className: 'result-title' }, service.title),
//     React.createElement('div', { className: 'result-author' }, service.author_role+": "+service.author),
//     React.createElement('div', { className: 'button-container' },
//         React.createElement('a', { className: 'button', href: "/apply-for-service?service=" + service.title}, 'Click for more info')
//     )
//   );
// };


// const SearchResults = function(props) {
//   const results = props.results;
//   return React.createElement(
//     "div",
//     { className: "results" },
//     results.map(function(service) {
//       return React.createElement(SearchResult, {
//         service: service,
//         key: service.title,
//       });
//     })
//   );
// };

// function search(keyword,attribute,dbServices,filteredData) {
//   // list of matches
//  for (service of dbServices){
//       //find out if text is in the given attribute
//       text = service[attribute].toLowerCase();
//       if (text.includes(keyword.toLowerCase())){
//           // don't create miltiple copies of the same result if the keyword appears twice
//           if (filteredData.includes(service)){

//           }
//           else{
//             filteredData.push(service)
//           }
          
//       }
//   }
//  return filteredData; 
// }


// const display_services = function(req, res) {
  
//   var keywords = req.query.keyword;
//   var filter = req.query.filter;
//   var attribute = 'title';
//   var filteredData = [];

//   // get database data
//   Services.find(function(err, dbServices){
//     if(!err){      
//       // TODO: perform the search using the keyword and filter
//       if (keywords != undefined){
//         keywords = keywords.trim();
//         var subStrings = keywords.split(" "); 
//         for (subString of subStrings){
//           filteredData = search(subString,attribute,dbServices,filteredData);
//         }
//       }else{
//         // if no query has been made, display all services
//         filteredData = dbServices;
//       }
//       //res.render(service_page_display({ results: filteredData }));

//       fs.readFile('public/services.html', 'utf-8', (err, data) => {
//         if (err) {
//           console.error(err);
//           return;
//         }
//         // var "data" now contains the contents of the file
//         var html = ReactDomServer.renderToString(React.createElement(SearchResults, { results: filteredData }));
//         let divToReplace = '<div class ="results"></div>';
//         let newDivContent = html

//         let newData = data.replace(divToReplace, newDivContent);

//         res.send(newData);
//         });
//       };

  
//   });
// };


// module.exports = display_services;
