import React, { Component, useEffect, useState, useRef } from 'react';
import {BASE_BACKEND_URL} from '../../../config.js'


function SignUpPage({ mainInfo, allFormData }) {

  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    const searchParams = new URLSearchParams(window.location.search);
    formData.append("service", searchParams.get('service'));

    formData.append("name", nameRef.current.value);
    formData.append("email", emailRef.current.value);

    fetch(`${BASE_BACKEND_URL}/store-application`, {
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

  return (
    <div>
      <div className="sign-up-form">
        <form action="/store-application" id="form" 
          className="sign-up-form-boxes" method="POST" onSubmit={handleSubmit}>
          <div className="service-header" id="sign-up-header">Fill in the Info Below to Sign Up Today!</div>
            <div className="sign-up-form-container">
                <div className="text-container" id="name-container">
                    <label htmlFor="name" className="sign-up-form-text"> Full Name: </label>
                    <input type="text" className="sign-up-form-input" 
                    placeholder="First and Last Name" ref={nameRef}
                    id="name" name="name" required/><br/>
                </div>

                <div className="text-container" id="email-container">
                    <label htmlFor="email" className="sign-up-form-text"> Email: </label>
                    <input type="email" className="sign-up-form-input" 
                    placeholder="School Email" ref={emailRef}
                    id="email" name="email" required/><br/>
                </div>
            </div> 
            <input type="submit" value="Submit" className="service-submit-button"/><br/>
        </form>
      </div>
  </div>
  )
}

export default SignUpPage;