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




const store_add_service = async function(req, username) {
  try {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const time = hours.toString() + ':' + minutes.toString() + ':' + seconds.toString();
    const meetingTime = req.body.details_times;
    const meetingDate = req.body.details_date;
    const location = req.body.details_location;
    var contacts = JSON.parse(req.body.contacts);

    const services_with_images = [];
    console.log(req.files);
    for (const file of req.files) {
      const service_with_image = new Service({
        personal_name: req.body.personal_name,
        personal_number: req.body.personal_number,
        personal_email: req.body.personal_email,
        personal_role: req.body.personal_role,
        title: req.body.title,
        author: req.body.author,
        author_role: "President",
        photoType: file.mimetype,
        photo: fs.readFileSync(file.path),
        meetingTime: meetingTime,
        meetingDate: meetingDate,
        location: location,
        description: req.body.description,
        contacts: contacts,
        date: formattedDate,
        time: time,
        user: username
      });
      services_with_images.push(service_with_image);
    }

    await Service.insertMany(services_with_images);
    req.files.forEach((file) => {
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};


      
 
module.exports = store_add_service;