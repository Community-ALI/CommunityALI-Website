// FILE OVERVIEW
// This file recieves a service from the user
// Then, it stores that service in the database
// FIXME: this needs to be finalized and explained
// the code is designed to recieve multiple services, when in reality it should always be one
const fs = require('fs');
const models = require("../define-database-models");
const Service = models.Services;

const store_service = function(req, res) { 
    
    // create json data from form
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const time = hours.toString()+ ':' + minutes.toString()+ ':' + seconds.toString();;
    var details = [
      "<u> Time </u>:  " + req.body.details_times,
      "<u> Date </u>:  " + req.body.details_date,
      "<u> Location </u>:  " + req.body.details_location
    ]
    var contacts = [
      "<u> " + req.body.author + " </u> :  " + req.body.president_email,
      "<u> " + req.body.vice_president_name + " </u> :  " + req.body.vice_president_email,
      "<u> " + req.body.ICC_rep_name + " </u> :  " + req.body.ICC_rep_email
    ]
    services_with_images = [];
    for (let file of req.files) {
        const service_with_image = new Service({
          title: req.body.title,  
          author: req.body.author,
          author_role: "President",
          photoType: file.mimetype,
          photo: fs.readFileSync(file.path),         // TODO: make photo an image file not string
          details: details,
          description: req.body.description, 
          contacts: contacts, 
          date: formattedDate, 
          time: time 
          });
          services_with_images.push(service_with_image)
        }
        Service.insertMany(services_with_images, function(err) {
          if (err) {
            console.log(err);
            res.status(500).send("Error saving images to database");
          } else {
            console.log("Service saved to database");
            res.send("/signup-success.html");
          }
        });
      };

      
 
module.exports = store_service;