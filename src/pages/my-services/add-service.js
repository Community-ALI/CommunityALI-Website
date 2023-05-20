import React, { Component, useState, useEffect } from "react";
// import '../components/footer.css';
import NavBar from '../../components/NavBar';
import '../../components/navbar.css';
import addServiceCss from './add-service.css';

function AddService() {

      const [file, setFile] = useState(null);
    
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
    
      const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
      };
    
  return (
    <div>
        <NavBar isFixedPage={false} />,
        <form action="/store-service" method="POST" className="service-container" id='form' onSubmit={handleSubmit}>
          <div className="service-title">
            <input type="text" placeholder="Name of the Club" className="club-title-text-box" name="title" id='title' required /><br />
          </div>

          <div className="service-info-container">
            <div className="file-container" id="file-container">
              <header>Club Photo Uploader</header>
              <label className="file-form" htmlFor="file-input">
                <i className="fas fa-cloud-upload-alt" id="file-icon" />
                <p>Click to Upload File</p>
              </label>
              <input className="file-input" id="file-input" type="file" name="file" onChange={handleFileChange} required />
              <section className="progress-area" />
              <section className="uploaded-area" />
            </div>

            <div className="service-details" id="service-details">
              <div className="service-author">
                <input type="text" placeholder="President of the Club" className="meeting-details-title-box" name="subtitle" id='meeting-details-title-box' required /><br />
              </div>

              <div className="service-header">Meeting Details</div>

              <div>
                <u> Time: </u>
                <input type="text" placeholder="Include start and end time" className="meeting-details-text-box" name="time" id='details-times' required /><br />
              </div>

              <div>
                <u> Date: </u>
                <input type="text" placeholder="Include day and month" className="meeting-details-text-box" name="date" id='details-date' required /><br />
              </div>

              <div>
                <u> Location: </u>
                <input type="text" placeholder="Include building and room" className="meeting-details-text-box" name="location" id='details-location' required /><br />
              </div>
            </div>
          </div>

          <div className="service-description">
            <textarea rows="5" type="text" placeholder="Include a description of what the club does and its mission..." className="meeting-description-text-box" name="description" id="description" required></textarea>
          </div>

          <div className="service-info2-container">
            <div className="service-details" id="contact-container">
              <div className="service-author"></div>
              <div className="service-header">Contact and Social Media</div>

              <div className="contacts-container">
                <select className="club-contacts-selection" name="contact-and-social-media" id='contact-role-1' required>
                  <option value="" selected> Select Officer</option>
                  <option value="president">President</option>
                  <option value="vice-president">Vice President</option>
                  <option value="icc-rep">ICC Rep</option>
                  <option value="advisor">Advisor</option>
                  <option value="teasurer">Treasurer</option>
                </select>
                <input type="text" placeholder="Full Name of Officer" className="contacts-text-box" name="contact-name-1" id='contact-name-1' required /><br />
                <input type="email" placeholder="School or Personal Email of Officer" className="contacts-email-box" name="contact-email-1" id='contact-email-1' required /><br />
              </div>

              <div className="contacts-container">
                <select className="club-contacts-selection" name="contact-and-social-media" id='contact-role-2' required>
                  <option value="" selected> Select Officer</option>
                  <option value="president">President</option>
                  <option value="vice-president">Vice President</option>
                  <option value="icc-rep">ICC Rep</option>
                  <option value="advisor">Advisor</option>
                  <option value="teasurer">Treasurer</option>
                </select>
                <input type="text" placeholder="Full Name of Officer" className="contacts-text-box" name="contact-name-2" id='contact-name-2' required /><br />
                <input type="email" placeholder="School or Personal Email of Officer" className="contacts-email-box" name="contact-email-2" id='contact-email-2' required /><br />
              </div>

              <div className="contacts-container">
                <select className="club-contacts-selection" name="contact-and-social-media" id='contact-role-3' required>
                  <option value="" selected> Select Officer</option>
                  <option value="president">President</option>
                  <option value="vice-president">Vice President</option>
                  <option value="icc-rep">ICC Rep</option>
                  <option value="advisor">Advisor</option>
                  <option value="teasurer">Treasurer</option>
                </select>
                <input type="text" placeholder="Full Name of Officer" className="contacts-text-box" name="contact-name-3" id='contact-name-3' required /><br />
                <input type="email" placeholder="School or Personal Email of Officer" className="contacts-email-box" name="contact-email-3" id='contact-email-3' required /><br />
              </div>

              <div className="contacts-container">
                <select className="club-contacts-selection" name="contact-and-social-media" id='contact-role-4' required>
                  <option value="" selected> Select Officer</option>
                  <option value="president">President</option>
                  <option value="vice-president">Vice President</option>
                  <option value="icc-rep">ICC Rep</option>
                  <option value="advisor">Advisor</option>
                  <option value="teasurer">Treasurer</option>
                </select>
                <input type="text" placeholder="Full Name of Officer" className="contacts-text-box" name="contact-name-4" id='contact-name-4' required /><br />
                <input type="email" placeholder="School or Personal Email of Officer" className="contacts-email-box" name="contact-email-4" id='contact-email-4' required /><br />
              </div>
            </div>

            <div className="sign-up-container">
              <label htmlFor="authorization" className="authorization-text">
                By submitting this application I authorize Community ALI to publish all the information of this application for anybody
                to view. I hold responsibility for the information displayed from this application and I represent the club's interest to do so.
                I understand that this application will be subject to review, in which any inappropriate content associated with the club or its
                members will result in immediate termination of the club from the platform. I understand that there is no tolerance for any discrimination
                against race, religion, sex or gender, sexual orientation, ethnicity, or disability within Community ALI.
              </label>
              {/* <input type="submit" value="Save Application" id="save-button" className="application-buttons"> */}
              <input type="submit" value="Submit Application" id="submit-button" className="application-buttons" />
            </div>
          </div>
        </form>
      </div>
  );
}

export default AddService;
