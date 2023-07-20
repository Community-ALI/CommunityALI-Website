import React, { useRef, useState, useEffect } from "react";
import '../add-service.css';

function OverviewPage({ formData, setFormData, serviceType = 'Club', editMode = false}) {

  const [tisOpen, setTisOpen] = useState(false); 

  const schoolOptions = [
    "Agriculture",
    "Art, Performance & The Humanities",
    "Behavioral & Social Sciences",
    "Business & Computing",
    "Fitness & Health Professions",
    "Industry & Trades",
    "Language Arts & Education",
    "Public Safety",
    "Science, Engineering & Mathematics",
    "Other"
  ];

  const toggleSelectOption = () => {
    setTisOpen(!tisOpen);
  }

  const [fileContainerID, setFileContainerID] = useState('file-container');
  const fileUploadText = useRef();
  useEffect(() => {
    if (formData.file) {
      setFileContainerID('file-container-with-file');
      const element = fileUploadText.current;
      element.textContent = `File uploaded! (${formData.file.name})`;
    } else {
      setFileContainerID('file-container');
      const element = fileUploadText.current;
      if (editMode === false){
        element.textContent = 'Click to upload a single image File';
      }
      else{
        element.textContent = `Click to change ${serviceType.toLowerCase()} thumbnail`
      }
    }
  }, [formData.file]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFormData((prevData) => ({ ...prevData, file: selectedFile }));
  };

  const handleFormChange = (event) => {
    event.persist(); // Notify React to persist the event object
    const { name, value, type, checked } = event.target;
  
    if (type === "checkbox") {
      
      setFormData((prevData) => {
        const selectedValues = prevData.categories || []; // Initialize as an empty array if not defined
        if (checked) {
          return { ...prevData, categories: [...selectedValues, name] };
        } else {
          return { ...prevData, categories: selectedValues.filter((option) => option !== name) };
        }
      });
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };


  const handleCategoryClick = (event) => {
    const categoryName = event.target.getAttribute("data-category");
    setFormData((prevData) => {
      const selectedValues = prevData.categories || [];
      if (selectedValues.includes(categoryName)) {
        return { ...prevData, categories: selectedValues.filter((option) => option !== categoryName) };
      } else {
        return { ...prevData, categories: [...selectedValues, categoryName] };
      }
    });
  };
  

  return (
    <div>
      <div className="service-info-container">
        <div className="file-container" id={fileContainerID}>
          <header>{serviceType} Photo Uploader</header>
          <label className="file-form" htmlFor="file-input">
            <i className="fas fa-cloud-upload-alt" id="file-icon" />
            {editMode === false? (
              <p ref={fileUploadText}>Click to upload a single image File</p>
            ) : (
              <p ref={fileUploadText}>Click to change {serviceType.toLowerCase()} thumbnail</p>
            )}
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
              placeholder= {`President of the ${serviceType.toLowerCase()}`}
              onChange={handleFormChange}
              name="subtitle"
              value={formData.subtitle || ""}
              className="meeting-details-title-box"
              id="meeting-details-title-box"
            />
            <br />
          </div>

          <div className="service-header">Meeting Details</div>

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
              placeholder="Include building and room"
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
          rows="4"
          type="text"
          placeholder={`Include a description of the ${serviceType.toLowerCase()}...`} // used to be: "Include a description of what the club does and its mission..."
          onChange={handleFormChange}
          name="description"
          value={formData.description || ""}
          className="meeting-description-text-box"
          id="description"
        ></textarea>
      </div>

      <div className="service-category-container">
        <div className="service-category-title">
          Select the Categories that Fits Your {serviceType.toLowerCase()}
        </div>
        <div className="service-categories">
          {schoolOptions.map((option) => (
            <div className="service-category" 
            key={option}
            onClick={handleCategoryClick}
            data-category={option}
            >
              <label className='cb-label' >
                <input
                  type="checkbox"
                  onChange={handleFormChange}
                  onBlur={() => {}}
                  name={option}
                  checked={(formData.categories && formData.categories.includes(option)) || false}
                  className="category-selection"
                />
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default OverviewPage;