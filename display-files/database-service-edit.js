// FILE OVERVIEW
// This file recieves an edited service from the user
// Then, it finds the old service in the database
// it updates that service with the new information
const fs = require('fs');
const models = require("../define-database-models");
const Service = models.Services;

const store_service = function(req, res, token) { 
    
    // create json data from form
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const time = hours.toString()+ ':' + minutes.toString()+ ':' + seconds.toString();
    var details = [
      "<u> Time </u>:  " + req.body.details_times,
      "<u> Date </u>:  " + req.body.details_date,
      "<u> Location </u>:  " + req.body.details_location
    ]
    var contacts = [
      "<u> President</u> : " + req.body.author + "  :  " + req.body.president_email,
      "<u> Vice president</u> : " + req.body.vice_president_name + "  :  " + req.body.vice_president_email,
      "<u> ICC rep</u> : " + req.body.ICC_rep_name + "  :  " + req.body.ICC_rep_email,
      "<u> Advisor</u> : " + req.body.advisor_name + "  :  " + req.body.advisor_email
    ]
    if (req.files[0]==undefined){
        const updateData = { 
          $set: {
            personal_name: req.body.personal_name,
            personal_number: req.body.personal_number,
            personal_email: req.body.personal_email,
            personal_role: req.body.personal_role,
            title: req.body.title,  
            author: req.body.author,
            author_role: "President",
            details: details,
            description: req.body.description, 
            contacts: contacts, 
            date: formattedDate, 
            time: time, 
            user: token.username
          }
          };
          const filter = { title: req.body.old_service_name}
          Service.updateMany(filter, updateData, function(err) {
            if (err) {
              console.log(err);
              res.status(500).send("Error saving images to database");
            } else {
              console.log("Service edited to database");
              res.send("/signup-success.html");
            }
          });
        }
        // there is no new file
        else{
          file = req.files[0];
          const updateData = { 
            $set: {
              personal_name: req.body.personal_name,
              personal_number: req.body.personal_number,
              personal_email: req.body.personal_email,
              personal_role: req.body.personal_role,
              title: req.body.title,  
              author: req.body.author,
              author_role: "President",
              photo: fs.readFileSync(file.path),
              details: details,
              description: req.body.description, 
              contacts: contacts, 
              date: formattedDate, 
              time: time, 
              user: token.username
            }
            };
            const filter = { title: req.body.old_service_name}
            Service.updateMany(filter, updateData, function(err) {
              if (err) {
                console.log(err);
                res.status(500).send("Error saving images to database");
              } else {
                console.log("Service edited to database");
                res.send("/signup-success.html");
              }
            });
        }
      };

      
 
module.exports = store_service;