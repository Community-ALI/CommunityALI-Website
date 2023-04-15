// FILE OVERVIEW:
// this file takes the apply-for-service.html file and changes it to match the service in the database
// then it sends the file to be viewed by the client
// this file and the rest of the backend need to be rewritten!
// FIXME: rather than storing a details array willed with html data, store the variables and then convert them to html
// when the client needs them! It will work so much better and make more sense



const models = require("../define-database-models");
const Services = models.Services;

// file system allows the server to read html from the client. I think?
const fs = require('fs');

// allow the server to manipulate client side js easily 
const domino = require('domino');

const display_service_edit_page = function(req,res){
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
      
      if (selected_service_json == 'ERROR: no service found'){
        console.error(selected_service_json);
        res.send(selected_service_json);
        return
      }
      
      fs.readFile('public/service-edit.html', 'utf-8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const window = domino.createWindow(data);
        // get the document from the window
        const document = window.document;
        // find the elements and fill in the previous data
        // your name
        const personal_name = document.getElementById('personal-name');
        personal_name.value = selected_service_json.personal_name;
        // your contact
        const personal_number = document.getElementById('personal-number');
        personal_number.value = selected_service_json.personal_number;
        // your email
        const personal_email = document.getElementById('personal-email');
        personal_email.value = selected_service_json.personal_email;
        // your role
        const role = document.getElementById('personal-role');
        role.value = selected_service_json.personal_role;
        // club name
        const title = document.getElementById('title');
        title.value = selected_service_json.title;

        // decode detail array
        const details = selected_service_json.details;
        // location
        const details_location = document.getElementById('details-location');
        details_location.value = details[2].split(":  ")[1];
        // date
        const details_date = document.getElementById('details-date');
        details_date.value = details[1].split(":  ")[1];
        // time
        const details_times = document.getElementById('details-times');
        details_times.value = details[0].split(":  ")[1];
        // contact array to split
        try{
          const contacts = selected_service_json.contacts;
          // description
          const description = document.getElementById('description');
          description.value = selected_service_json.description;
          // president
          const author = document.getElementById('author');
          author.value = selected_service_json.author;
          const president_email = document.getElementById('president-email');
          president_email.value = contacts[0].split(":  ")[1];
          // vp name
          const vice_president_name = document.getElementById('vice-president-name');
          vice_president_name.value = contacts[1].split(": ")[1];

          const vice_president_email = document.getElementById('vice-president-email');
          vice_president_email.value = contacts[1].split(":  ")[1];


          // ICC name
          const ICC_rep_name = document.getElementById('ICC-rep-name');
          ICC_rep_name.value = contacts[2].split(": ")[1];

          const ICC_rep_email = document.getElementById('ICC-rep-email');
          ICC_rep_email.value = contacts[2].split(":  ")[1];
          // advisor name
          const advisor_name = document.getElementById('advisor-name');
          advisor_name.value = contacts[3].split(": ")[1];

          const advisor_email = document.getElementById('advisor-email');
          advisor_email.value = contacts[3].split(":  ")[1];}
        catch{

        }

        const image_label = document.getElementById("service-image-label");
        image_label.innerHTML = "Service Image: (leaving this blank will keep your old image)"

        const image_upload = document.getElementById("files");
        image_upload.removeAttribute("required");
        
        console.log(selected_service_json.title)
        // send the modified HTML to the client
        res.send(window.document.documentElement.outerHTML);
        });
      };
  });
}
module.exports = display_service_edit_page;
