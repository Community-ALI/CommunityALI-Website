import React, { Component, useState, useEffect } from "react";
// import '../components/footer.css';
import NavBar from '../../components/NavBar';
import '../../components/navbar.css';
import addServiceCss from './add-service.css';
import { Buffer } from 'buffer';
function EditService() {

      const [file, setFile] = useState(null);

      const [service, setService] = useState({
        "title": "",
        "author": "",
        "author_role": "",
        "meetingTime": "",
        "meetingDate": "",
        "location": "",
        "contacts": [
          {role: '', name: '',email: ''},
          {role: '', name: '',email: ''},
          {role: '', name: '',email: ''},
          {role: '', name: '',email: ''}],
        "photo": null,
        "description": "",
        "user": "",
        "date": "",
        "personal_email": "",
        "personal_name": "",
        "personal_number": "",
        "personal_role": "",
        "time": ""
      }
      
      );

      const handleSubmit = (event) => {
        event.preventDefault();
      
        // Check if the image size is "close" to 1200 x 800
        const image = new Image();
        if (file){
          image.src = URL.createObjectURL(file);
        }
        else{
          image.src = './Photos/NoPhoto.jpg';
        }
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
          const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);
  
          // Retrieve a specific parameter value
          const serviceName = urlParams.get('service');
          await fetch('http://localhost:3000/edit-service?service='+serviceName,{
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
      };
    
      const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
      };
      
      useEffect(() => {
        const fetchData = async () => {
          const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);
  
          // Retrieve a specific parameter value
          const serviceName = urlParams.get('service');
              
              const response = await fetch('http://localhost:3000/get-one-service?service='+serviceName)
                  .then(response => response.json())
                  .then(data => {
                      // 'data' variable will contain the received service
                      const buffer = Buffer.from(data.photo.data);
                      const base64 = buffer.toString('base64');
                      const imageUrl = `data:image/png;base64,${base64}`;
                      data.photo = imageUrl;
                      console.log(data.contacts[0].role)
                      setService(data);
                      // show the page
                      const loaderWrapper = document.querySelector(".loader-wrapper");
                      loaderWrapper.style.transition = "opacity 0.5s";
                      loaderWrapper.style.opacity = "0";
                      setTimeout(() => {
                          loaderWrapper.style.display = "none";
                      }, 500); // fade out duration in milliseconds
                  })
        };
        fetchData();
      }, []);

  return (
    <div>
        <div className="loader-wrapper">
          <span className="loader"><span className="loader-inner"></span></span>
        </div>
        <NavBar isFixedPage={false} />,
        <form action="/store-service" method="POST" className="service-container" id='form' onSubmit={handleSubmit}>
          <div className="service-title">
            <input type="text" placeholder="Name of the Club" className="club-title-text-box" name="title" id='title' defaultValue={service.title} required /><br />
          </div>

          <div className="service-info-container">
            <div className="file-container" id="file-container">
              <header>Club Photo Uploader</header>
              <label className="file-form" htmlFor="file-input">
                <i className="fas fa-cloud-upload-alt" id="file-icon" />
                <p>Click to Upload File</p>
              </label>
              <input className="file-input" id="file-input" type="file" name="file" onChange={handleFileChange} />
              <section className="progress-area" />
              <section className="uploaded-area" />
            </div>

            <div className="service-details" id="service-details">
              <div className="service-author">
                <input type="text" placeholder="President of the Club" className="meeting-details-title-box" name="subtitle" id='meeting-details-title-box' defaultValue={service.author} required /><br />
              </div>

              <div className="service-header">Meeting Details</div>

              <div>
                <u> Time: </u>
                <input type="text" defaultValue={service.meetingTime} placeholder="Include start and end time" className="meeting-details-text-box" name="time" id='details-times' required /><br />
              </div>

              <div>
                <u> Date: </u>
                <input type="text" defaultValue={service.meetingDate} placeholder="Include day and month" className="meeting-details-text-box" name="date" id='details-date' required /><br />
              </div>

              <div>
                <u> Location: </u>
                <input type="text" defaultValue={service.location} placeholder="Include building and room" className="meeting-details-text-box" name="location" id='details-location' required /><br />
              </div>
            </div>
          </div>

          <div className="service-description">
            <textarea rows="5" defaultValue={service.description} type="text" placeholder="Include a description of what the club does and its mission..." className="meeting-description-text-box" name="description" id="description" required></textarea>
          </div>

          <div className="service-info2-container">
            <div className="service-details" id="contact-container">
              <div className="service-author"></div>
              <div className="service-header">Contact and Social Media</div>

              <div>
                {/* Contact 1 */}
                <div className="contacts-container">
                  <select className="club-contacts-selection" name="contact-and-social-media" id='contact-role-1' required>
                    <option value="">Select Officer</option>
                    <option value="president" selected={service.contacts[0].role === 'president'}>President</option>
                    <option value="vice-president" selected={service.contacts[0].role === 'vice-president'}>Vice President</option>
                    <option value="icc-rep" selected={service.contacts[0].role === 'icc-rep'}>ICC Rep</option>
                    <option value="advisor" selected={service.contacts[0].role === 'advisor'}>Advisor</option>
                    <option value="treasurer" selected={service.contacts[0].role === 'treasurer'}>Treasurer</option>
                  </select>
                  <input defaultValue={service.contacts[0].name} type="text" placeholder="Full Name of Officer" className="contacts-text-box" name="contact-name-1" id='contact-name-1' required /><br />
                  <input defaultValue={service.contacts[0].email} type="email" placeholder="School or Personal Email of Officer" className="contacts-email-box" name="contact-email-1" id='contact-email-1' required /><br />
                </div>

                {/* Contact 2 */}
                <div className="contacts-container">
                  <select className="club-contacts-selection" name="contact-and-social-media" id='contact-role-2' required>
                    <option value="">Select Officer</option>
                    <option value="president" selected={service.contacts[1].role === 'president'}>President</option>
                    <option value="vice-president" selected={service.contacts[1].role === 'vice-president'}>Vice President</option>
                    <option value="icc-rep" selected={service.contacts[1].role === 'icc-rep'}>ICC Rep</option>
                    <option value="advisor" selected={service.contacts[1].role === 'advisor'}>Advisor</option>
                    <option value="treasurer" selected={service.contacts[1].role === 'treasurer'}>Treasurer</option>
                  </select>
                  <input defaultValue={service.contacts[1].name} type="text" placeholder="Full Name of Officer" className="contacts-text-box" name="contact-name-2" id='contact-name-2' required /><br />
                  <input defaultValue={service.contacts[1].email} type="email" placeholder="School or Personal Email of Officer" className="contacts-email-box" name="contact-email-2" id='contact-email-2' required /><br />
                </div>

                {/* Contact 3 */}
                <div className="contacts-container">
                  <select className="club-contacts-selection" name="contact-and-social-media" id='contact-role-3' required>
                    <option value="">Select Officer</option>
                    <option value="president" selected={service.contacts[2].role === 'president'}>President</option>
                    <option value="vice-president" selected={service.contacts[2].role === 'vice-president'}>Vice President</option>
                    <option value="icc-rep" selected={service.contacts[2].role === 'icc-rep'}>ICC Rep</option>
                    <option value="advisor" selected={service.contacts[2].role === 'advisor'}>Advisor</option>
                    <option value="treasurer" selected={service.contacts[2].role === 'treasurer'}>Treasurer</option>
                  </select>
                  <input defaultValue={service.contacts[2].name} type="text" placeholder="Full Name of Officer" className="contacts-text-box" name="contact-name-3" id='contact-name-3' required /><br />
                  <input defaultValue={service.contacts[2].email} type="email" placeholder="School or Personal Email of Officer" className="contacts-email-box" name="contact-email-3" id='contact-email-3' required /><br />
                </div>

                {/* Contact 4 */}
                <div className="contacts-container">
                  <select className="club-contacts-selection" name="contact-and-social-media" id='contact-role-4' required>
                    <option value="">Select Officer</option>
                    <option value="president" selected={service.contacts[3].role === 'president'}>President</option>
                    <option value="vice-president" selected={service.contacts[3].role === 'vice-president'}>Vice President</option>
                    <option value="icc-rep" selected={service.contacts[3].role === 'icc-rep'}>ICC Rep</option>
                    <option value="advisor" selected={service.contacts[3].role === 'advisor'}>Advisor</option>
                    <option value="treasurer" selected={service.contacts[3].role === 'treasurer'}>Treasurer</option>
                  </select>
                  <input defaultValue={service.contacts[3].name} type="text" placeholder="Full Name of Officer" className="contacts-text-box" name="contact-name-4" id='contact-name-4' required /><br />
                  <input defaultValue={service.contacts[3].email} type="email" placeholder="School or Personal Email of Officer" className="contacts-email-box" name="contact-email-4" id='contact-email-4' required /><br />
                </div>
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

export default EditService;
