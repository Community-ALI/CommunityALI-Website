import React, { useState } from "react";
import '../add-service.css';

function RequirementsPage({ formData, setFormData }) {
  const maxRequireLength = 10;
  const [RequireData, setRequireData] = useState(formData.Requirements || [{ RequireTitle: "", RequireDescription: "" }]);
  const [RequireVisible, setRequireVisible] = useState(true);

  const updateFormData = (updatedRequireData) => {
    setRequireData(updatedRequireData);
    setFormData((prevData) => ({ ...prevData, Requirements: updatedRequireData }));
  };

  const RequireAdd = () => {
    if (RequireData.length >= maxRequireLength - 1) {
      setRequireVisible(false);
    }
    const updatedRequireData = [...RequireData, { RequireTitle: "", RequireDescription: "" }];
    updateFormData(updatedRequireData);
  };

  const RequireDelete = (k) => {
    setRequireVisible(true);
    const updatedRequireData = [...RequireData];
    updatedRequireData.splice(k, 1);
    updateFormData(updatedRequireData);
  };

  const RequireChange = (p, k) => {
    const { name, value } = p.target;
    const updatedRequireData = [...RequireData];
    updatedRequireData[k][name] = value;
    updateFormData(updatedRequireData);
  };

  return (
    <div className="faq">
      <div id="faq-container">
        <div className="service-header" id="faq-title">
        Requirements
        </div>
        {RequireData.map((RequireVal, k) => (
          <div className="contacts-container" key={k}>
            <input
              type="text"
              placeholder="Title of the requierment (like a 2 word description)"
              className="contacts-text-box"
              name="RequireTitle"
              value={RequireVal.RequireTitle}
              onChange={(p) => RequireChange(p, k)}
              id="question-text-box"
            /><br />
            <div className="text-button-container">
              <input
                type="url"
                placeholder="Explanation of the requierment"
                className="contacts-email-box"
                name="RequireDescription"
                value={RequireVal.RequireDescription}
                onChange={(p) => RequireChange(p, k)}
                id="answer-text-box"
              /><br />
              <button type="button" className="delete-button" onClick={() => RequireDelete(k)}>
                Delete
              </button>
            </div>
          </div>
        ))}
        {RequireVisible && (
          <div className="add-button-container">
            <button type="button" className="add-button" onClick={RequireAdd}>
              Add another requirement
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RequirementsPage;
