import React, { useRef, Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './contact-form.css';
import './navbar.css';
import NavBar from './NavBar';
import emailjs from '@emailjs/browser';

function contactForm()
{
    emailjs.init("pn7YfOec7bHOKYp6Y");
    
    const form = useRef();

    function sendMail() 
    {
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var message = document.getElementById("message").value;
        
        // Check if email is valid
        if (!isValidEmail(email)) {
          alert("Please enter a valid email address");
          return;
        }

        var params = {
          name: name,
          email: email,
          message: message
        };
      
        const serviceID = "service_gv6i9wn";
        const templateID = "template_zn2vook";
      
        emailjs.sendForm(serviceID, templateID, form.current, params)
        .then(res=>{
          document.getElementById("name").value = "";
          document.getElementById("email").value = "";
          document.getElementById("message").value = "";
          console.log(res);
          alert("Your message sent successfully!!");
        })
        .catch(err=>console.log(err));
    }

      
    function isValidEmail(email) 
    {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    return(
    <div>
        <NavBar isFixedPage={false} />,
        <div className="body-container">
            <div className="body-header">
                <h1 className="body-title">Having Questions or Concerns?</h1>
                <h2 className="body-subtitle"> We aim to create the best experience for our users and we 
                    appreciate all the feedback we can get. Send us a message and
                    we'll respond if further assistance is needed! </h2>
        </div>

        <form className="contact-us-container" ref={form} onSubmit={sendMail}>
            <h1 className="contact-form-title">Contact form</h1>
            <div className="contact-form-container">
                <div className="form-group">
                    <label className="form-label" htmlFor="name"> Full Name </label>
                    <input
                        type="text"
                        className="form-input"
                        id="name"
                        placeholder="Enter name" />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="email"> Email </label>
                    <input
                        type="email"
                        className="form-input"
                        id="email"
                        placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="message"> Message </label>
                    <textarea className="form-text-area" id="message" rows="5" placeholder="Your message"></textarea>
                </div>

                <input type='submit'value="Send" id="form-submit-button" className="btn btn-primary"/>
            </div>

            <h1 className="contact-form-second-title">Additional Contacts</h1>
            <div className="contact-form-container" id="right-form-container">
                <div className="form-email"> Follow our Instagram : <a className="form-link" href="https://www.instagram.com/community_ali/" target="_blank\"> @community_ali </a></div>
                <div className="form-email"> Follow our Facebook : <a className="form-link" href="https://www.instagram.com/community_ali/" target="_blank\"> @Community_ALIs </a></div>
                <div className="form-email"> Follow our Twitter : <a className="form-link" href="https://www.facebook.com/profile.php?id=100089185347335&mibextid=ZbWKwL" target="_blank\"> Community Catalyst </a> </div>
            </div>
        </form>
        </div>
    </div>
    )
}

export default contactForm;