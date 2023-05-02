// FILE OVERVIEW
// This file recieves a service from the user
// Then, it stores that service in the database
// FIXME: this needs to be finalized and explained
// the code is designed to recieve multiple services, when in reality it should always be one
const fs = require('fs');
const models = require("../connect-to-database");
const Service = models.Services;

//json web token
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;


const store_add_service = function(req, res){
  try{
    if (req.headers.authorization != undefined){
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, JWT_SECRET);
      console.log('service upload')
      store_service(req, res, decodedToken);
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
    services_with_images = [];
    for (let file of req.files) {
        const service_with_image = new Service({
          personal_name: req.body.personal_name,
          personal_number: req.body.personal_number,
          personal_email: req.body.personal_email,
          personal_role: req.body.personal_role,
          title: req.body.title,  
          author: req.body.author,
          author_role: "President",
          photoType: file.mimetype,
          photo: fs.readFileSync(file.path),         // TODO: make photo an image file not string
          details: details,
          description: req.body.description, 
          contacts: contacts, 
          date: formattedDate, 
          time: time, 
          user: token.username
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

        // delete the temporary file
        req.files.forEach((file) => {
          fs.unlink(file.path, (err) => {
            if (err) {
              console.error(err);
            }
          });
        });

      };

      
 
module.exports = store_add_service;