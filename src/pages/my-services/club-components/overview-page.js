import React, { useRef, Component, useState, useEffect } from "react";
import './add-club.css';

function OverviewPage() {

    const [file, setFile] = useState(null);
    const[fileContainerID, setFileContainerID] = useState('file-container')
    const fileUploadText = useRef();

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        if (selectedFile){
          setFileContainerID('file-container-with-file')
          const element = fileUploadText.current;
          element.textContent = `File Uploaded! (${selectedFile.name})`
        }
        else{
          setFileContainerID('file-container')
          const element = fileUploadText.current;
          element.textContent = `Click to upload a single image File`
        }
      };

    return(
        <div>
            <div className="service-info-container">
                <div className="file-container" id={fileContainerID} >
                    <header>Club Photo Uploader</header>
                    <label className="file-form" htmlFor="file-input">
                    <i className="fas fa-cloud-upload-alt" id="file-icon" />
                    <p ref={fileUploadText}>Click to upload a single image File</p>

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

            <div className="service-description">
            <textarea rows="5" type="text" placeholder="Include a description of what the club does and its mission..." 
            className="meeting-description-text-box" name="description" id="description" ></textarea>
            </div>
        </div>
    )
}

export default OverviewPage;