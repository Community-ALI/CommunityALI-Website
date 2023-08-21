import React, { useState } from "react";
import '../add-service.css';

function ContactsPage({ formData, setFormData, serviceType = 'Club'}) { 


  const updateFormData = (updatedContactData) => {
    setContactData(updatedContactData);
    setFormData((prevData) => ({ ...prevData, contacts: updatedContactData}));
  };
  
  const contactAdd = () => {
    if (contactData.length >= maxContactCount - 1) {
      setContactVisible(false);
    }
    const updatedContactData = [...contactData, { contactRole: "", contactName: "", contactEmail: "" }];
    updateFormData(updatedContactData);
  };

  const contactDelete = (j) => {
    setContactVisible(true);
    const updatedContactData = [...contactData];
    updatedContactData.splice(j, 1);
    updateFormData(updatedContactData);
  };


  const contactChange = (h, j) => {
    const { name, value } = h.target;
    const updatedContactData = [...contactData];
    updatedContactData[j][name] = value;
    updateFormData(updatedContactData);
  };

  const maxContactCount = 5;
  const [contactData, setContactData] = useState(formData.contacts || [{ contactRole: "", contactName: "", contactEmail: "" }]);
  const [contactVisible, setContactVisible] = useState(true);
  var personTitle = '';
  var roleArray = [];
  if (serviceType === 'Club'){
    personTitle = 'Officer';
    var roleArray = ["President", "Vice President", "ICC Rep", "Advisor"];
  }
  else if (serviceType === 'Internship'){
    personTitle = "*FIXME: ADD PERSON TITLE*";
  }
  
  return (
    <div>
      <div className="service-info2-container">
        <div className="service-details" id="contact-container">
          <div className="service-author"></div>
          <div className="service-header">Contact Us</div>

          {contactData.map((contactVal, j) => (
            <div className="contacts-container" key={j}>
              {serviceType === 'Club' ? 
              <select
                className="club-contacts-selection"
                name="contactRole"
                value={contactVal.contactRole}
                onChange={(h) => contactChange(h, j)}>
                <option value="">Select {personTitle}</option>
                {roleArray.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              : 
              <>
              </>}
              <input
                type="text"
                placeholder={'Enter the Full Name'}
                className="contacts-text-box"
                name="contactName"
                value={contactVal.contactName}
                onChange={(h) => contactChange(h, j)}
                id={`contact-name-${j + 1}`}
              /><br />
              <div className="text-button-container">
                <input
                  type="text"
                  placeholder={"Enter School or Personal Email "}
                  className="contacts-email-box"
                  name="contactEmail"
                  value={contactVal.contactEmail}
                  onChange={(h) => contactChange(h, j)}
                  id={`contact-email-${j + 1}`}
                /><br />
                <button type="button" className="delete-button" onClick={() => contactDelete(j)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
          {contactVisible && (
            <div className="add-button-container">
              <button type="button" className="add-button" onClick={contactAdd}>
                Add another Contact
              </button>
            </div>
          )}
          {/* <p> {JSON.stringify(contactData)} </p> */}
        </div>
      </div>
    </div>
  );
}

export default ContactsPage;
