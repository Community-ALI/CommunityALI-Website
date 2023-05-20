import React, { Component, useEffect, useState, useRef} from 'react';
import '../../pages/explore-services/service-info.css'
import NavBar from '../../components/NavBar';
import Footer from "../../components/Footer";
import { Buffer } from 'buffer';
const ContactsComponent = (props) => {
    const contacts = props.contacts;
    return (
      <div>
        {contacts.map((contact, index) => (
          <p key = {contact.id}><u>{contact.role}</u> : {contact.name} : {contact.email}</p>
        ))}
      </div>
    );
  };

function ServiceInfo() {
    const [service, setService] = useState({
      "title": "",
      "author": "",
      "author_role": "",
      "meetingTime": "",
      "meetingDate": "",
      "location": "",
      "contacts": [],
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

    // get services from the backend
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

    const nameRef = useRef(null);
    const emailRef = useRef(null);

    const handleSubmit = (event) => {
      event.preventDefault();
  
      const formData = new FormData();
      const searchParams = new URLSearchParams(window.location.search);
      formData.append("service", searchParams.get('service'));
  
      formData.append("name", nameRef.current.value);
      formData.append("email", emailRef.current.value);
  
      fetch("http://localhost:3000/store-application", {
        method: 'POST',
        body: formData
      })
      .then(response => {
        return response.text();
      })
      .then(data => {
        window.location.href = '/signup-success'
      })
      .catch(error => {
        console.log(error);
        
      });
    }

    // return the page
    return(
        <div>
            <div className="loader-wrapper">
                <span className="loader"><span className="loader-inner"></span></span>
            </div>
            <NavBar isFixedPage={true} />
            
            <div className="service-container">
                <div className="service-title">
                    {service.title}
                </div>

                <div className="service-info-container">
                    <div className="service-picture">
                        <img className="info-image" src={service.photo} />
                    </div>

                    <div className="service-details" id="service-details">
                    <div className="service-author">{service.author}</div>
                    <div className="service-header">Meeting Details</div>
                      <p><u>Date</u> : {service.meetingDate}</p>
                      <p><u>Time</u> : {service.meetingTime}</p>
                      <p><u>Location</u> : {service.location}</p>
                    </div>
                </div>

                <div className="service-description">
                    {service.description}
                </div>

                <div className="service-info2-container">
                    <div className="service-details" id="contact-container">
                    <div className="service-author">How to Reach Us</div>
                    <div className="service-header">Contact and Social Media</div>
                    <ContactsComponent contacts={service.contacts} />
                    </div>

                    <div className="sign-up-container">
                    <div className="sign-up-title">
                        Sign up Today!
                    </div>

                    <div className="sign-up-form">
                        <form onSubmit={handleSubmit} method="POST" id="form">
                        <div className="form-container">
                            <div className="text-container" id="name-container">
                            <label htmlFor="name" className="form-text">Full Name:</label>
                            <input type="text" placeholder="First and Last Name" id="name" name="name" ref = {nameRef} required /><br />
                            <div className="error" id="nameError"></div>
                            </div>

                            <div className="text-container" id="email-container">
                            <label htmlFor="email" className="form-text">Email:</label>
                            <input type="email" placeholder="School Email" id="email" name="email" ref = {emailRef} required /><br />
                            <div className="error" id="emailError"></div>
                            </div>
                        </div>
                        <input type="submit" value="Submit" className="submit-button" />
                        </form>
                    </div>
                    </div>
                </div>
                </div>

            
            <Footer />
        </div>
    )
}

export default ServiceInfo;