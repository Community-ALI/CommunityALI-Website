import React, { useRef, useState, useEffect } from "react";
import '../add-service.css';

function OverviewPage({ formData, setFormData }) {
  const [file, setFile] = useState(null);
  const [fileContainerID, setFileContainerID] = useState('file-container');
  const fileUploadText = useRef();

  useEffect(() => {
    if (formData.file) {
      setFileContainerID('file-container-with-file');
      const element = fileUploadText.current;
      element.textContent = `File Uploaded! (${formData.file.name})`;
    } else {
      setFileContainerID('file-container');
      const element = fileUploadText.current;
      element.textContent = 'Click to upload a single image File';
    }
  }, [formData.file]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFormData((prevData) => ({ ...prevData, file: selectedFile }));
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <div className="service-info-container">
        <div className="file-container" id={fileContainerID}>
          <header>Internship Photo Uploader</header>
          <label className="file-form" htmlFor="file-input">
            <i className="fas fa-cloud-upload-alt" id="file-icon" />
            <p ref={fileUploadText}>Click to upload a single image File</p>
          </label>
          <input
            className="file-input"
            id="file-input"
            type="file"
            name="file"
            onChange={handleFileChange}
          />
          <section className="progress-area" />
          <section className="uploaded-area" />
        </div>

        <div className="service-details">
          <div className="service-author">
            <input
              type="text"
              placeholder="Organizer of the Internship"
              onChange={handleFormChange}
              name="subtitle"
              value={formData.subtitle || ""}
              className="meeting-details-title-box"
              id="meeting-details-title-box"
            />
            <br />
          </div>

          <div className="service-header">Internship Details</div>

          <div>
            <u> Time: </u>
            <input
              type="text"
              placeholder="Include start and end time"
              onChange={handleFormChange}
              name="time"
              value={formData.time || ""}
              className="meeting-details-text-box"
              id="details-times"
            />
            <br />
          </div>

          <div>
            <u> Date: </u>
            <input
              type="text"
              placeholder="Include day and month"
              onChange={handleFormChange}
              name="date"
              value={formData.date || ""}
              className="meeting-details-text-box"
              id="details-date"
            />
            <br />
          </div>

          <div>
            <u> Location: </u>
            <input
              type="text"
              placeholder="Include building or room"
              onChange={handleFormChange}
              name="location"
              value={formData.location || ""}
              className="meeting-details-text-box"
              id="details-location"
            />
            <br />
          </div>
        </div>
      </div>

      <div className="service-description">
        <textarea
          rows="5"
          type="text"
          placeholder="Include a description of what this internship is and what it's for..."
          onChange={handleFormChange}
          name="description"
          value={formData.description || ""}
          className="meeting-description-text-box"
          id="description"
        ></textarea>
      </div>
    </div>
  );
}

export default OverviewPage;
