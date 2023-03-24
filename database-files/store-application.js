// FILE OVERVIEW
// This file recieves an application from the user
// Then, it stores that application in the database
// Finally, it sends the user to the signup-success.html page

const models = require("./define-database-models");
const Application = models.Application;

const store_application = function(req, res) { 
    
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
          console.log('application from ',req.body.name,' submitted');
          res.send("/signup-success.html");
        }
      });
    }

module.exports = store_application;