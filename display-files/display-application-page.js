// FILE OVERVIEW:
// this file takes the apply-for-service.html file and changes it to match the service in the database
// then it sends the file to be viewed by the client



const models = require("../define-database-models");
const Services = models.Services;

// file system allows the server to read html from the client. I think?
const fs = require('fs');

// allow the server to manipulate client side js easily 
const domino = require('domino');

const display_application_page = function(req,res){
  var selected_service = req.query.service;
  // get database data
  Services.find(function(err, foundServices){
    if(!err){
      // find this exact service
      var selected_service_json = 'ERROR: no service found'
      for (service of foundServices){
        if (service.title == selected_service) {
          selected_service_json = service;
        }
      }
      
      fs.readFile('public/apply-for-service.html', 'utf-8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const window = domino.createWindow(data);
        // get the document from the window
        const document = window.document;
        // find the element with class "service-title" and set it to the title
        const title = document.querySelector('.service-title');
        title.innerHTML = selected_service_json.title;
        // find the element with class "service-picture" and set it to the image
        const image = document.querySelector('.service-picture');

        const imageData = selected_service_json.photo.toString('base64');
        var imageSrc = `data:${service.photoType};base64,${imageData}`;
        
        // if (!fs.existsSync('public/'+selected_service_json.photo) || photo ==''){
        //   photo = 'Photos/NoPhoto.jpg' // TODO: put a default image here!
        // }

      
        image.innerHTML = '<img class="MANRRS-picture" src = "'+imageSrc+'"></img>' 

        // create details array
        detailsHTML = '<div class="service-author"></div><div class="service-header">Meeting Details</div>';
        for (detail of selected_service_json.details){
          detailsHTML+='<div>'
          detailsHTML+=detail;
          detailsHTML+='</div>'
        };
        // find the element with class "service-details" and set it to the service details
        const details = document.getElementById('service-details');
        details.innerHTML = detailsHTML;

        // find the element with class "service-author" and set it to the author
        const author = document.querySelector('.service-author');
        author.innerHTML = selected_service_json.author;

        // find the element with class "service-description" and set it to the description
        const description = document.querySelector('.service-description');
        description.innerHTML = selected_service_json.description;
        
        contactHTML = '<div class="service-author"></div><div class="service-header">Contact and Social Media</div>';
        for (contact of selected_service_json.contacts){
          contactHTML+='<div>'
          contactHTML+=contact;
          contactHTML+='</div>'
        };
        // find the element with ID "contact-container" and set it to the service details
        const contacts = document.getElementById('contact-container');
        contacts.innerHTML = contactHTML;

        // send the modified HTML to the client
        res.send(window.document.documentElement.outerHTML);
        });
      };
  });
}
module.exports = display_application_page;
