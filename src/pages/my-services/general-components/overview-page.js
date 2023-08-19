import React, { useRef, useState, useEffect } from "react";
import '../add-service.css';
import ImageUploaderPopup from './image-uploader-popup';

function OverviewPage({ formData, setFormData, serviceType = 'Club', editMode = false}) {
  const fileInputRef = useRef(null);
  const popupRef = useRef(null);
  const [isShowingImageUploaderPopup, setIsShowingImageUploaderPopup] = useState(false);
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
  

  const uploadClicked = () => {
    fileInputRef.current.click();
  }

  const handleClickOutsidePopup = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsShowingImageUploaderPopup(false);
    }
    
  };

  return (
    <div className="mb-[100px]">
      <div className="service-info-container" >
      {formData.file ? <img onClick={() => {setIsShowingImageUploaderPopup(!isShowingImageUploaderPopup)}} className="service-image-container" src={formData.file ? URL.createObjectURL(formData.file) : ""} alt="" style={{ cursor: 'pointer' }} onMouseOver={(e) => e.target.style.filter = 'brightness(70%)'} onMouseOut={(e) => e.target.style.filter = 'brightness(100%)'}/>

      : <div className="file-container" onClick={uploadClicked}>
          <header>{serviceType} Photo Uploader</header>
          <i className="fas fa-cloud-upload-alt" id="file-icon" />
          <p >Click to upload a single image File</p>
      </div>
          
    }
    {isShowingImageUploaderPopup &&  
    <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 100000,
    }}
    onClick={handleClickOutsidePopup}
  >
    <div ref={popupRef}>
      <ImageUploaderPopup
        imageUrl={formData.file ? URL.createObjectURL(formData.file)  : ""}
        isShowingImageUploaderPopup={isShowingImageUploaderPopup}
        setFormData={setFormData}
        onClose={() => setIsShowingImageUploaderPopup(false)}
      />
    </div>
    </div>
    }
    <input
      className="file-input"
      id="file-input"
      type="file"
      name="file"
      onChange={handleFileChange}
      ref={fileInputRef}
    />


        <div className="service-details">
          <div className="service-author">
            <input
              type="text"
              placeholder= {`President of the ${serviceType}`}
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
          Select the Categories that Fits Your {serviceType}
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
