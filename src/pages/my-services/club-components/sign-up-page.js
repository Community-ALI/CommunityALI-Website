import React, { useRef, Component, useState, useEffect } from "react";
import './add-club.css';

function SignUpPage({mainInfo, allFormData}) {
    console.log(allFormData)
    const checkRequired = () => {
      // Check required fields for Overview
      if (
        !allFormData.Overview.subtitle ||
        !allFormData.Overview.time ||
        !allFormData.Overview.date ||
        !allFormData.Overview.location ||
        !allFormData.Overview.description ||
        !allFormData.Overview.file
      ) {
        alert('Overview is incomplete');
        return false;
      }
    
      // Check required fields for Contacts
      if (allFormData.Contacts.contacts) {
        const contacts = allFormData.Contacts.contacts;
    
        // Check required fields for each contact
        const contactsComplete = contacts.every(
          (contact) =>
            contact.contactRole && contact.contactName && contact.contactEmail
        );
    
        if (!contactsComplete) {
          alert('Contacts are incomplete');
          return false;
        }
      }
      if (allFormData.Contacts.socialMedia){
        // Check required fields for social media
        const socialMedia = allFormData.Contacts.socialMedia
        const socialMediaComplete = socialMedia.every(
          (media) => media.mediaType && media.mediaName && media.mediaUrl
        );
    
        if (!socialMediaComplete) {
          alert('Social media is incomplete');
          return false;
        }
      }
      return true;
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      if (checkRequired()){
        // do stuff
      }
      else{
        alert('you are missing required information!')
      }
    }

    return(
        <div>
            <div className="sign-up-form">
              <div id="form" className="sign-up-form-boxes">
                <div className="service-header" id="sign-up-header">Become a New Club Member Today!</div>
                  <div className="sign-up-form-container">
                      <div className="text-container" id="name-container">
                          <label htmlFor="name" className="sign-up-form-text"> Full Name: </label>
                          <input type="text" className="sign-up-form-input" placeholder="First and Last Name" 
                          id="name" name="name" readOnly/><br/>
                      </div>

                      <div className="text-container" id="email-container">
                          <label htmlFor="email" className="sign-up-form-text"> Email: </label>
                          <input type="email" className="sign-up-form-input" placeholder="School Email" 
                          id="email" name="email" readOnly/><br/>
                      </div>
                  </div> 
                  <input placeholder="Submit" className="sign-up-submit-button" readOnly/><br/>
              </div>
            </div>

            <div className="authorization-container">
                <label htmlFor="authorization" className="authorization-text">
                By submitting this application I authorize Community ALI to publish all the information of this application for anybody
                to view. I hold responsibility for the information displayed from this application and I represent the club's interest to do so.
                I understand that this application will be subject to review, in which any inappropriate content associated with the club or its
                members will result in immediate termination of the club from the platform. I understand that there is no tolerance for any discrimination
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