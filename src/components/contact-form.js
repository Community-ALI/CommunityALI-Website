import React, { useRef, Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './contact-form.css';
import './navbar.css';
import NavBar from './NavBar';

function contactForm()
{
    // FIX THIS (IT'S FOR EMAILING)
    // function(){
    //     emailjs.init("pn7YfOec7bHOKYp6Y");
    //   } 

    function sendMail() {
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
      
        emailjs.send(serviceID, templateID, params)
        .then(res=>{
          document.getElementById("name").value = "";
          document.getElementById("email").value = "";
          document.getElementById("message").value = "";
          console.log(res);
          alert("Your message sent successfully!!");
        })
        .catch(err=>console.log(err));
      }
      
    function isValidEmail(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    return(
    <div>
        <NavBar isFixedPage={false} />,
        <div class="body-container">
            <div class="body-header">
                <h1 class="body-title">Having Questions or Concerns?</h1>
                <h2 class="body-subtitle"> We aim to create the best experience for our users and we 
                    appreciate all the feedback we can get. Send us a message and
                    we'll respond if further assistance is needed! </h2>
        </div>

        <div class="contact-us-container">
            <h1 class="contact-form-title">Contact form</h1>
            <div class="contact-form-container">
                <div class="form-group">
                    <label class="form-label" for="name"> Full Name </label>
                    <input
                        type="text"
                        class="form-input"
                        id="name"
                        placeholder="Enter name" />
                </div>

                <div class="form-group">
                    <label class="form-label" for="email"> Email </label>
                    <input
                        type="email"
                        class="form-input"
                        id="email"
                        placeholder="Enter email" />
                </div>

                <div class="form-group">
                    <label class="form-label" for="message"> Message </label>
                    <textarea class="form-text-area" id="message" rows="5" placeholder="Your message"></textarea>
                </div>

                <button id="form-submit-button" class="btn btn-primary" onclick="sendMail()"> Send </button>
            </div>
            <h1 class="contact-form-second-title">Additional Contacts</h1>
            <div class="contact-form-container" id="right-form-container">
                <div class="form-email"> Follow our Instagram : <a class="form-link" href="https://www.instagram.com/community_ali/" target="_blank\"> @community_ali </a></div>
                <div class="form-email"> Follow our Facebook : <a class="form-link" href="https://www.instagram.com/community_ali/" target="_blank\"> @Community_ALIs </a></div>
                <div class="form-email"> Follow our Twitter : <a class="form-link" href="https://www.facebook.com/profile.php?id=100089185347335&mibextid=ZbWKwL" target="_blank\"> Community Catalyst </a> </div>
            </div>
        </div>
        </div>
    </div>
    )
}

export default contactForm;