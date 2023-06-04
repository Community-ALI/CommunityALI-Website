import React, { useState } from "react";
import './add-club.css';

function ContactsPage({ formData, setFormData }) { 
  const maxContactCount = 5;
  const maxMediaCount = 5;
  const [contactData, setContactData] = useState(formData.contacts || [{ contactRole: "", contactName: "", contactEmail: "" }]);
  const [mediaData, setMediaData] = useState(formData.socialMedia || [{ mediaType: "", mediaName: "", mediaUrl: "" }]);
  const [socialMediaVisible, setSocialMediaVisible] = useState(true);
  const [contactVisible, setContactVisible] = useState(true);

  const updateFormData = (updatedContactData, updatedMediaData) => {
    setContactData(updatedContactData);
    setMediaData(updatedMediaData);
    setFormData((prevData) => ({ ...prevData, contacts: updatedContactData, socialMedia: updatedMediaData }));
  };

  const contactAdd = () => {
    if (contactData.length >= maxContactCount - 1) {
      setContactVisible(false);
    }
    const updatedContactData = [...contactData, { contactRole: "", contactName: "", contactEmail: "" }];
    updateFormData(updatedContactData, mediaData);
  };

  const mediaAdd = () => {
    if (mediaData.length >= maxMediaCount - 1) {
      setSocialMediaVisible(false);
    }
    const updatedMediaData = [...mediaData, { mediaType: "", mediaName: "", mediaUrl: "" }];
    updateFormData(contactData, updatedMediaData);
  };

  const contactDelete = (j) => {
    setContactVisible(true);
    const updatedContactData = [...contactData];
    updatedContactData.splice(j, 1);
    updateFormData(updatedContactData, mediaData);
  };

  const mediaDelete = (i) => {
    setSocialMediaVisible(true);
    const updatedMediaData = [...mediaData];
    updatedMediaData.splice(i, 1);
    updateFormData(contactData, updatedMediaData);
  };

  const contactChange = (h, j) => {
    const { name, value } = h.target;
    const updatedContactData = [...contactData];
    updatedContactData[j][name] = value;
    updateFormData(updatedContactData, mediaData);
  };

  const mediaChange = (e, i) => {
    const { name, value } = e.target;
    const updatedMediaData = [...mediaData];
    updatedMediaData[i][name] = value;
    updateFormData(contactData, updatedMediaData);
  };

  return (
    <div>
      <div className="service-info2-container">
        <div className="service-details" id="contact-container">
          <div className="service-author"></div>
          <div className="service-header">Contact Us</div>

          {contactData.map((contactVal, j) => (
            <div className="contacts-container" key={j}>
              <select
                className="club-contacts-selection"
                name="contactRole"
                id={`contact-role-${j + 1}`}
                value={contactVal.contactRole}
                onChange={(h) => contactChange(h, j)}
              >
                <option value="">
                  Select Officer
                </option>
                <option value="president">President</option>
                <option value="vice-president">Vice President</option>
                <option value="icc-rep">ICC Rep</option>
                <option value="advisor">Advisor</option>
              </select>
              <input
                type="text"
                placeholder="Full Name of Officer"
                className="contacts-text-box"
                name="contactName"
                value={contactVal.contactName}
                onChange={(h) => contactChange(h, j)}
                id={`contact-name-${j + 1}`}
              /><br />
              <div className="text-button-container">
                <input
                  type="email"
                  placeholder="School or Personal Email of Officer"
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

        <div className="service-details" id="contact-container">
          <div className="service-author"></div>
          <div className="service-header">Follow our Social Media</div>

          {mediaData.map((mediaVal, i) => (
            <div className="contacts-container" key={i}>
              <select
                className="club-contacts-selection"
                name="mediaType"
                value={mediaVal.mediaType}
                onChange={(e) => mediaChange(e, i)}
                id={`contact-role-${i + 1}`}
              >
                <option value="">
                  Select Media
                </option>
                <option value="zoom">Zoom</option>
                <option value="discord">Discord</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
              </select>
              <input
                type="text"
                placeholder="Club Account Name"
                className="contacts-text-box"
                name="mediaName"
                value={mediaVal.mediaName}
                onChange={(e) => mediaChange(e, i)}
                id={`contact-name-${i + 1}`}
              /><br />
              <div className="text-button-container">
                <input
                  type="url"
                  placeholder="Insert link to the Club Account"
                  className="contacts-email-box"
                  name="mediaUrl"
                  value={mediaVal.mediaUrl}
                  onChange={(e) => mediaChange(e, i)}
                  id={`contact-email-${i + 1}`}
                /><br />
                <button type="button" className="delete-button" onClick={() => mediaDelete(i)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
          {socialMediaVisible && (
            <div className="add-button-container">
              <button type="button" className="add-button" onClick={mediaAdd}>
                Add another Social Media
              </button>
            </div>
          )}

          {/* <p> {JSON.stringify(mediaData)} </p> */}
        </div>
      </div>
    </div>
  );
}

export default ContactsPage;
