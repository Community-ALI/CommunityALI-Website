// FILE OVERVIEW:
// this file takes the apply-for-service.html file and changes it to match the service in the database
// then it sends the file to be viewed by the client
// this file and the rest of the backend need to be rewritten!
// FIXME: rather than storing a details array willed with html data, store the variables and then convert them to html
// when the client needs them! It will work so much better and make more sense



const models = require("../connect-to-database");
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
      
      fs.readFile('public/my-services/edit-service.html', 'utf-8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const window = domino.createWindow(data);
        // get the document from the window
        const document = window.document;
        // find the elements and fill in the previous data
        
        // club name
        const title = document.getElementById('title');
        title.value = selected_service_json.title;

        // fill author
        const meeting_details_title_box = document.getElementById('meeting-details-title-box');
        meeting_details_title_box.value = selected_service_json.author;

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
          // contact 1
          const contact_role_1 = document.getElementById('contact-role-1');
          contact_role_1.querySelector(`option[value="${contacts[0].split("</u>")[0].substring(4)}"]`).setAttribute('selected', '');
          // name
          const contact_name_1 = document.getElementById('contact-name-1');
          console.log(contacts[0])
          contact_name_1.value = contacts[0].split(":")[1].slice(0,-2);
          // email
          const contact_email_1 = document.getElementById('contact-email-1');
          contact_email_1.value = contacts[0].split(":")[2];

          // contact 2
          const contact_role_2 = document.getElementById('contact-role-2');
          contact_role_2.querySelector(`option[value="${contacts[1].split("</u>")[0].substring(4)}"]`).setAttribute('selected', '');
          // name
          const contact_name_2 = document.getElementById('contact-name-2');
          contact_name_2.value = contacts[1].split(":")[1].slice(0,-2);
          // email
          const contact_email_2 = document.getElementById('contact-email-2');
          contact_email_2.value = contacts[1].split(":")[2];
          
          // contact 3
          const contact_role_3 = document.getElementById('contact-role-3');
          contact_role_3.querySelector(`option[value="${contacts[2].split("</u>")[0].substring(4)}"]`).setAttribute('selected', '');
          // name
          const contact_name_3 = document.getElementById('contact-name-3');
          contact_name_3.value = contacts[2].split(":")[1].slice(0,-2);
          // email
          const contact_email_3 = document.getElementById('contact-email-3');
          contact_email_3.value = contacts[2].split(":")[2];

          // contact 4
          const contact_role_4 = document.getElementById('contact-role-4');
          contact_role_4.querySelector(`option[value="${contacts[3].split("</u>")[0].substring(4)}"]`).setAttribute('selected', '');
          // name
          const contact_name_4 = document.getElementById('contact-name-4');
          contact_name_4.value = contacts[3].split(":")[1].slice(0,-2);
          // email
          const contact_email_4 = document.getElementById('contact-email-4');
          contact_email_4.value = contacts[3].split(":")[2];
        }
        catch(err){
          console.log(err);
        }

        // const image_label = document.getElementById("service-image-label");
        // image_label.innerHTML = "Service Image: (leaving this blank will keep your old image)"

        const image_upload = document.getElementById("file-input");
        image_upload.removeAttribute("required");
        
        console.log(selected_service_json.title)
        // send the modified HTML to the client
        res.send(window.document.documentElement.outerHTML);
        });
      };
  });
}
module.exports = display_service_edit_page;
