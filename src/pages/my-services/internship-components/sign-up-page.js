import React, {useState, useRef} from "react";
import {BASE_BACKEND_URL} from '../../../config.js'
import '../add-service.css';
import { useNavigate } from 'react-router-dom';
function SignUpPage({mainInfo, allFormData, serviceType = 'Internship', editMode = false}) {
  const [showAuthorizationPopup, setShowAuthorizationPopup] = useState(false);

  const toggleAuthorizationPopup = () => 
  {
    setShowAuthorizationPopup((prev) => !prev);
  };

  let navigate = useNavigate();
    const checkRequired = () => {
      if (
        !mainInfo.title) {
        alert('Please provide an internship name');
        return false;
      }

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
      if (allFormData.FAQ.faq){
        const FAQ = allFormData.FAQ.faq;

        const faqComplete = FAQ.every(
          (faq) =>
          faq.faqQuestion && faq.faqAnswer
        );
    
        if (!faqComplete) {
          alert('faq is incomplete');
          return false;
        }
      }

      // check that the link has been provided
      const link = document.getElementById('sign-up-form-box-input');
      if (!link.value){
        alert('Please provide a link to the internship');
        return false;
      };

      if (allFormData.Requirements.Requirements){
        const Requirements = allFormData.Requirements.Requirements;

        const RequirementsComplete = Requirements.every(
          (require) =>
          require.RequireTitle && require.RequireDescription
        );
    
        if (!RequirementsComplete) {
          alert('Requirements are incomplete');
          return false;
        }
      }
      return true;
    };

      

      


    const handleSubmit = (event) => {
      event.preventDefault();
      if (checkRequired()){
        const selectedFile = allFormData.Overview.file;
        
        if (selectedFile) {
          const sendFormData = new FormData();
          sendFormData.append('title', mainInfo.title);
          sendFormData.append('serviceType', mainInfo.serviceType);
          sendFormData.append('image', selectedFile);
          const link = document.getElementById('sign-up-form-box-input');
          sendFormData.append('internshipLink', link.value);
          const OverviewData = {
            'subtitle': allFormData.Overview.subtitle,
            'time': allFormData.Overview.time,
            'date': allFormData.Overview.date,
            'location': allFormData.Overview.location,
            'description': allFormData.Overview.description
          }
          var ContactsData = {}
          if (allFormData.Contacts.contacts || allFormData.Contacts.socialMedia){
            ContactsData = {
              'contacts': allFormData.Contacts.contacts,
              'socialMedia': allFormData.Contacts.socialMedia
            }
          }

          var FAQData = {}
          if (allFormData.FAQ.faq){
            FAQData = {
              'faq': allFormData.FAQ.faq
            }
          }

          var RequirementsData = {}
          if (allFormData.Requirements.Requirements){
            RequirementsData = {
              'Requirements': allFormData.Requirements.Requirements
            }
          }
          
          const JsonData = {
            'overview': OverviewData,
            'contacts': ContactsData,
            'requirements': RequirementsData,
            'FAQ': FAQData
          }
          const jsonString = JSON.stringify(JsonData);

          // Append the JSON blob or file to the FormData
          sendFormData.append('pages', jsonString);
          const token = localStorage.getItem('token');
          var fetchURL = `${BASE_BACKEND_URL}/servicedata/upload-service`
          if (editMode){
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            
            const serviceName = urlParams.get('service');
            fetchURL = `${BASE_BACKEND_URL}/servicedata/edit-service?service=`+serviceName;
          }
          fetch(fetchURL, {
            method: 'POST',
            body: sendFormData,
            headers: {
              'Authorization': `Bearer ${token}`
            },
          })
            .then(response => response.json())
            .then(data => {
              // Handle response from the server
              navigate('/services'); // Navigate to the new page without triggering beforeunload event
            })
            .catch(error => {
              // Handle error
              console.error('Upload failed:', error);
            });
        }
      }
      else{
        
      }
    }

    return(
      <div>
          <div className="sign-up-form">
            <div id="form" className="sign-up-form-boxes">
              <div className="service-header" id="sign-up-header">Join this Internship Today!</div>
                <div className="sign-up-form-container">
                    {/* text input styled */}
                    
                        <div className="sign-up-form-box-title">Link</div>
                        <input placeholder="Link" className="sign-up-form-box-input" id="sign-up-form-box-input" ></input>

                    
                </div> 
                {/* <input placeholder="Submit" className="sign-up-submit-button" readOnly/><br/> */}
            </div>
          </div>

          <div onClick={toggleAuthorizationPopup} className="sign-up-submit-container">
            <div className="sign-up-submit-button">
              Submit Internship Application
            </div>
          </div>
            
          {showAuthorizationPopup && (
          <div className="popup-overlay">
            <div className="authorization-container">
                <div className="authorization-container-title">
                  Please Read the Following
                </div>
                <label htmlFor="authorization" className="authorization-text">
                By submitting this application I authorize Community ALI to publish all the information of this application for any person
                to view. I hold responsibility for the information displayed from this application and I represent the organization's interest to do so.
                I understand that this application will be subject to review, in which any inappropriate content associated with the organization or its
                members will result in immediate termination of the internship from the platform. I understand that there is no tolerance for any discrimination
                against race, religion, sex or gender, sexual orientation, ethnicity, or disability within Community ALI.
                </label>

                <input
                  type="button"
                  value="Return to Editing"
                  className="sign-up-return-button"
                  onClick={toggleAuthorizationPopup} // Add the onClick event to close the pop-up
                />
                {/* <input type="button" value="Save Draft" id="draft-button" className="application-buttons" /> */}
                {editMode === false?(
                  <input type="submit" value="Agree to Terms and Conditions" id="submit-button" className="application-buttons" onClick={handleSubmit} />
                ) : (
                  <input type="submit" value="Update Internship" id="submit-button" className="application-buttons" onClick={handleSubmit} />

                  
                )}
            </div>
          </div>
          )}
      </div>
  )
}

export default SignUpPage;