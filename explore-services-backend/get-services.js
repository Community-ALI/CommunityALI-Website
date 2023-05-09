
// database
const models = require("../connect-to-database");
const Services = models.Services;


// access database, call functions, display page
const get_services = function (req, res) {
  
  Services.find(async function(err, foundServices){
    if(!err){
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
      res.json(foundServices);
    }
  });

}

// export to app.js 
module.exports = get_services;