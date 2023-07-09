import React, { useRef, Component, useState, useEffect } from "react";
import '../add-service.css';

function SignUpPage() {

    const handleSubmit = (event) => {
        event.preventDefault();
        if (file) {
          // Check if the image size is "close" to 1200 x 800
          const image = new Image();
          image.src = URL.createObjectURL(file);
          image.onload = async function () {
            const width = image.naturalWidth;
            const height = image.naturalHeight;
            const aspectRatio = width / height;
            const targetAspectRatio = 1200 / 800;
            const maxAspectRatioDiff = 0.1; // the allowable difference
            if (aspectRatio < targetAspectRatio - maxAspectRatioDiff || aspectRatio > targetAspectRatio + maxAspectRatioDiff) {
              alert("The image must be close to 1200 x 800.");
              return;
            }
    
            // If the image size is okay, proceed with the form submission
            const formData = new FormData();
    
            formData.append("title", document.getElementById("title").value);
            formData.append("details_location", document.getElementById("details-location").value);
            formData.append("details_times", document.getElementById("details-times").value);
            formData.append("details_date", document.getElementById("details-date").value);
            formData.append("description", document.getElementById("description").value);
            formData.append("author", document.getElementById("meeting-details-title-box").value);
            
        
            const contact_name_1 = document.getElementById("contact-name-1").value;
            const contact_email_1 = document.getElementById("contact-email-1").value;
            const contact_role_1 = document.getElementById("contact-role-1").value;
            const contact1 = {
              role: contact_role_1,
              name: contact_name_1,
              email: contact_email_1
            };
        
            
            const contact_name_2 = document.getElementById("contact-name-2").value;
            const contact_email_2 = document.getElementById("contact-email-2").value;
            const contact_role_2 = document.getElementById("contact-role-2").value;
            const contact2 = {
              role: contact_role_2,
              name: contact_name_2,
              email: contact_email_2
            };
        
            
            const contact_name_3 = document.getElementById("contact-name-3").value;
            const contact_email_3 = document.getElementById("contact-email-3").value;
            const contact_role_3 = document.getElementById("contact-role-3").value;
            const contact3 = {
              role: contact_role_3,
              name: contact_name_3,
              email: contact_email_3
            };
        
        
            const contact_name_4 = document.getElementById("contact-name-4").value;
            const contact_email_4 = document.getElementById("contact-email-4").value;
            const contact_role_4 = document.getElementById("contact-role-4").value;
            const contact4 = {
              role: contact_role_4,
              name: contact_name_4,
              email: contact_email_4
            }; 
        
        
            var contactsArray = [contact1, contact2, contact3, contact4];
            formData.append("contacts", JSON.stringify(contactsArray));

            formData.append("files", file);

            console.log(formData)
            const token = localStorage.getItem('token');
            await fetch('http://localhost:3000/upload-service',{
              method: 'POST',
              body: formData,
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
              .then((res) => {
                console.log(res);
                // Check the response status
                if (res.ok) {
                  // Redirect to new window after server response
                  window.location.href = '/services';
                } else {
                  // Handle server error
                  console.error("Error occurred", res);
                }
              })
              .catch((err) => {
                console.error("Error occurred", err);
              })
              .finally(() => {
                URL.revokeObjectURL(image.src);
              });
          };
        } else {
          // Handle case when no file is selected
          alert("Please select an image file.");
        }
      };

    return(
        <div>
            <div className="sign-up-form">
              <div id="form" className="sign-up-form-boxes">
                <div className="service-header" id="sign-up-header">Sign Up to this Project Today!</div>
                  <div className="sign-up-form-container">
                      <div className="text-container" id="name-container">
                          <label for="name" className="sign-up-form-text"> Full Name: </label>
                          <input type="text" className="sign-up-form-input" placeholder="First and Last Name" 
                          id="name" name="name" readOnly/><br/>
                      </div>

                      <div className="text-container" id="email-container">
                          <label for="email" className="sign-up-form-text"> Email: </label>
                          <input type="email" className="sign-up-form-input" placeholder="School Email" 
                          id="email" name="email" readOnly/><br/>
                      </div>
                  </div> 
                  <input placeholder="Submit" class="sign-up-submit-button" readOnly/><br/>
              </div>
            </div>

            <div className="authorization-container">
                <label htmlFor="authorization" className="authorization-text">
                By submitting this application I authorize Community ALI to publish all the information of this application for anybody
                to view. I hold responsibility for the information displayed from this application and I represent the organization's interest to do so.
                I understand that this application will be subject to review, in which any inappropriate content associated with the organization or its
                organizers will result in immediate termination of the volunteer project from the platform. I understand that there is no tolerance for any discrimination
                against race, religion, sex or gender, sexual orientation, ethnicity, or disability within Community ALI.
                </label>
                {/* <input type="submit" value="Save Application" id="save-button" className="application-buttons"> */}
                <input type="button" value="Save Draft" id="draft-button" className="application-buttons" />
                <input type="submit" value="Submit Application" id="submit-button" className="application-buttons" onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default SignUpPage;