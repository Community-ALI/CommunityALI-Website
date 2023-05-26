import React, { Component, useState, useEffect } from "react";
// import '../components/footer.css';
import NavBar from '../../components/NavBar';
import '../../components/navbar.css';
import addServiceCss from './add-service.css';
import { document } from "postcss";

function AddService() {

  const [contactData, setContactData] = useState([{contactRole:"", contactName:"", contactEmail:""}])
  const [mediaData, setMediaData] = useState([{mediaType:"", mediaName:"", mediaUrl:""}])
  const [faqData, setFaqData] = useState([{faqQuestion:"", faqAnswer:""}])

  const contactAdd=()=>{
    setContactData([...contactData,{contactRole:"", contactName:"", contactEmail:""}])
  }

  const mediaAdd=()=>{
    setMediaData([...mediaData,{mediaType:"", mediaName:"", mediaUrl:""}])
  }

  const faqAdd=()=>{
    setFaqData([...faqData,{faqQuestion:"", faqAnswer:""}])
  }
  
  const contactDelete=(j)=>{
    const deleteContactVal = [...contactData]
    deleteContactVal.splice(j,1)
    setContactData(deleteContactVal)
  }

  const mediaDelete=(i)=>{
    const deleteMediaVal = [...mediaData]
    deleteMediaVal.splice(i,1)
    setMediaData(deleteMediaVal)
  }

  const faqDelete=(k)=>{
    const deleteFaqVal = [...faqData]
    deleteFaqVal.splice(k,1)
    setFaqData(deleteFaqVal)
  }
  
  const contactChange=(h,j)=>{
    const {name, value} = h.target
    const onchangeContactVal = [...contactData]
    onchangeContactVal[j][name] = value
    setContactData(onchangeContactVal)
  }

  const mediaChange=(e,i)=>{
    const {name, value} = e.target
    const onChangeMediaVal = [...mediaData]
    onChangeMediaVal[i][name] = value
    setMediaData(onChangeMediaVal)
  }

  const faqChange=(p,k)=>{
    const {name, value} = p.target
    const onChangeFaqVal = [...faqData]
    onChangeFaqVal[k][name] = value
    setFaqData(onChangeFaqVal)
  }

  const[stylePage1, setStylePage1] = useState("page1Visible");
  const[stylePage2, setStylePage2] = useState("page2Invisible");
  const[stylePage3, setStylePage3] = useState("page3Invisible");
  const[stylePage4, setStylePage4] = useState("page4Invisible");

  const[styleColor1, setStyleColor1] = useState("overviewColor");
  const[styleColor2, setStyleColor2] = useState("contactColor");
  const[styleColor3, setStyleColor3] = useState("faqColor");
  const[styleColor4, setStyleColor4] = useState("signUpColor");

  const changeVisibility1=()=>{
    setStylePage1("page1Visible");
    setStylePage2("page2Invisible");
    setStylePage3("page3Invisible");
    setStylePage4("page4Invisible");
    setStyleColor1("overviewColor");
    setStyleColor2("contactColor");
    setStyleColor3("faqColor");
    setStyleColor4("signUpColor");
  }

  const changeVisibility2=()=>{
    setStylePage1("page1Invisible");
    setStylePage2("page2Visible");
    setStylePage3("page3Invisible");
    setStylePage4("page4Invisible");
    setStyleColor1("overviewChangeColor");
    setStyleColor2("contactChangeColor");
    setStyleColor3("faqColor");
    setStyleColor4("signUpColor");
  }

  const changeVisibility3=()=>{
    setStylePage1("page1Invisible");
    setStylePage2("page2Invisible");
    setStylePage3("page3Visible");
    setStylePage4("page4Invisible");
    setStyleColor1("overviewChangeColor");
    setStyleColor2("contactColor");
    setStyleColor3("faqChangeColor");
    setStyleColor4("signUpColor");
  }

  const changeVisibility4=()=>{
    setStylePage1("page1Invisible");
    setStylePage2("page2Invisible");
    setStylePage3("page3Invisible");
    setStylePage4("page4Visible");
    setStyleColor1("overviewChangeColor");
    setStyleColor2("contactColor");
    setStyleColor3("faqColor");
    setStyleColor4("signUpChangeColor");
  }

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
      <form action="/store-service" method="POST" 
      className="service-container" id='form'>
        
        <div className="service-title">
          <input type="text" placeholder="Name of the Club" 
          className="club-title-text-box" name="title" id='title'/><br />
        </div>

        <div className="service-navbar">
          <div className="service-navbar-text" id={styleColor1}>
            <a href="#" onClick={changeVisibility1} >Overview</a>
          </div>
          <div className="service-navbar-text" id={styleColor2}>
            <a href="#" onClick={changeVisibility2} >Contacts & Social Media</a>
          </div>
          <div className="service-navbar-text" id={styleColor3}>
            <a href="#" onClick={changeVisibility3} >FAQ</a>
          </div>
          <div className="service-navbar-text" id={styleColor4}>
            <a href="#" onClick={changeVisibility4} >Sign Up Today</a>
          </div>
        </div>

        <div className="service-info-container" id={stylePage1}>
          <div className="file-container" id="file-container">
            <header>Club Photo Uploader</header>
            <label className="file-form" htmlFor="file-input">
              <i className="fas fa-cloud-upload-alt" id="file-icon" />
              <p>Click to Upload File</p>
            </label>
            <input className="file-input" id="file-input" type="file" 
            name="file" onChange={handleFileChange}/>
            <section className="progress-area" />
            <section className="uploaded-area" />
          </div>

          <div className="service-details">
            <div className="service-author">
              <input type="text" placeholder="President of the Club" 
              className="meeting-details-title-box" name="subtitle" id='meeting-details-title-box' /><br />
            </div>

            <div className="service-header">Meeting Details</div>

            <div>
              <u> Time: </u>
              <input type="text" placeholder="Include start and end time" 
              className="meeting-details-text-box" name="time" id='details-times' /><br />
            </div>

            <div>
              <u> Date: </u>
              <input type="text" placeholder="Include day and month" 
              className="meeting-details-text-box" name="date" id='details-date' /><br />
            </div>

            <div>
              <u> Location: </u>
              <input type="text" placeholder="Include building and room" 
              className="meeting-details-text-box" name="location" id='details-location' /><br />
            </div>
          </div>
        </div>

        <div className="service-description" id={stylePage1}>
          <textarea rows="5" type="text" placeholder="Include a description of what the club does and its mission..." 
          className="meeting-description-text-box" name="description" id="description" ></textarea>
        </div>

        <div className="service-info2-container" id={stylePage2}>
          <div className="service-details" id="contact-container">
            <div className="service-author"></div>
            <div className="service-header">Contact Us</div>

          {
            contactData.map((contactVal,j)=>
            <div className="contacts-container">
              <select className="club-contacts-selection" name="contactRole" id='contact-role-1' 
              value={contactVal.contactRole} onChange={(h)=> contactChange(h,j)}>
                <option value="" selected> Select Officer</option>
                <option value="president">President</option>
                <option value="vice-president">Vice President</option>
                <option value="icc-rep">ICC Rep</option>
                <option value="advisor">Advisor</option>
              </select>
              <input type="text" placeholder="Full Name of Officer" className="contacts-text-box" name="contactName" 
              value={contactVal.contactName} onChange={(h)=> contactChange(h,j)} id='contact-name-1'  /><br />
              <div className="text-button-container">
                <input type="email" placeholder="School or Personal Email of Officer" className="contacts-email-box" name="contactEmail" 
                value={contactVal.contactEmail} onChange={(h)=> contactChange(h,j)} id='contact-email-1' /><br />
                <button type="button" className="delete-button" onClick={()=>contactDelete(j)}>Delete</button>   
              </div>
            </div>
            )
          }
          <div className="add-button-container">
            <button type="button" className="add-button" onClick={contactAdd}>Add another Contact</button>
          </div>
          {/* <p> {JSON.stringify(contactData)} </p>  */}
        </div>

          <div className="service-details" id="contact-container">
            <div className="service-author"></div>
            <div className="service-header">Follow our Social Media</div>
          
          {
            mediaData.map((mediaVal,i)=>
            <div className="contacts-container">
              <select className="club-contacts-selection" name="mediaType" 
              value={mediaVal.mediaType} onChange={(e)=> mediaChange(e,i)} id='contact-role-1'>
                <option value="" selected> Select Media</option>
                <option value="zoom">Zoom</option>
                <option value="discord">Discord</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
              </select>
              <input type="text" placeholder="Club Account Name" className="contacts-text-box" name="mediaName" 
              value={mediaVal.mediaName} onChange={(e)=> mediaChange(e,i)} id='contact-name-4' /><br />
              <div className="text-button-container">
                <input type="url" placeholder="Insert link to the Club Account" className="contacts-email-box" name="mediaUrl" 
                value={mediaVal.mediaUrl} onChange={(e)=> mediaChange(e,i)} id='contact-email-1' /><br />
                <button type="button" className="delete-button" onClick={()=>mediaDelete(i)}>Delete</button>    
              </div>
            </div>
            )
          }

          <div className="add-button-container">
            <button type="button" className="add-button" onClick={mediaAdd}>Add another Social Media</button>
          </div>
          {/* <p> {JSON.stringify(mediaData)} </p>  */}
          </div>
        </div>

        <div id={stylePage3}>
          <div className="" id="faq-container">
              <div className="service-header" id="faq-title">Frequently Asked Questions</div>
            {
              faqData.map((faqVal,k)=>
              <div className="contacts-container">
                <input type="text" placeholder="Insert Question Here" className="contacts-text-box" name="faqQuestion" 
                value={faqVal.faqQuestion} onChange={(p)=> faqChange(p,k)} id="question-text-box" /><br />
                <div className="text-button-container">
                  <input type="url" placeholder="Insert Answer to the Question Above" className="contacts-email-box" name="faqAnswer" 
                  value={faqVal.faqAnswer} onChange={(p)=> faqChange(p,k)} id="answer-text-box" /><br />
                  <button type="button" className="delete-button" onClick={()=>faqDelete(k)}>Delete</button>    
                </div>
              </div>
              )
            }
            <div className="add-button-container">
              <button type="button" className="add-button" onClick={faqAdd}>Add another FAQ</button>
            </div>
            {/* <p> {JSON.stringify(faqData)} </p>  */}
          </div>
        </div>     

        <div className="sign-up-form" id={stylePage4}>
              <form action="" id="form">
                <div className="service-header" id="sign-up-header">Become a New Club Member Today!</div>
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
                  <input type="submit" class="sign-up-submit-button"/><br/>
              </form>
            </div>

          <div className="authorization-container" id={stylePage4}>
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
      </form>
    </div>
  );
}

export default AddService;
