import React, { useState } from "react";
import '../add-service.css';

function MediaPage({ formData, setFormData, serviceType = 'Club'}) { 

  const updateFormData = (updatedMediaData) => {
    setMediaData(updatedMediaData);
    setFormData((prevData) => ({ ...prevData, socialMedia: updatedMediaData }));
  };

  const mediaAdd = () => {
    if (mediaData.length >= maxMediaCount - 1) {
      setSocialMediaVisible(false);
    }
    const updatedMediaData = [...mediaData, { mediaType: "", mediaName: "", mediaUrl: "" }];
    updateFormData(updatedMediaData);
  };

  const mediaDelete = (i) => {
    setSocialMediaVisible(true);
    const updatedMediaData = [...mediaData];
    updatedMediaData.splice(i, 1);
    updateFormData(updatedMediaData);
  };

  const mediaChange = (e, i) => {
    const { name, value } = e.target;
    const updatedMediaData = [...mediaData];
    updatedMediaData[i][name] = value;
    updateFormData(updatedMediaData);
  };
  const maxMediaCount = 5;
  const [mediaData, setMediaData] = useState(formData.socialMedia || [{ mediaType: "", mediaName: "", mediaUrl: "" }]);
  const [socialMediaVisible, setSocialMediaVisible] = useState(true);
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
                placeholder="Account Name"
                className="contacts-text-box"
                name="mediaName"
                value={mediaVal.mediaName}
                onChange={(e) => mediaChange(e, i)}
                id={`contact-name-${i + 1}`}
              /><br />
              <div className="text-button-container">
                <input
                  type="url"
                  placeholder="Insert link to the Account"
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

export default MediaPage;
