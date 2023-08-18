import React, { useState, useEffect, useRef } from 'react';
import {BASE_BACKEND_URL} from '../../../config.js'


function SignUpPage() {
  // variable to record wether the user is logged in or not
  const [loggedIn, setLoggedIn] = useState(true);
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to sign up for a service');
      return;
    }

    const formData = new FormData();
    const searchParams = new URLSearchParams(window.location.search);
    formData.append("service", searchParams.get('service'));

    formData.append("name", nameRef.current.value);
    formData.append("email", emailRef.current.value);
    
      
    fetch(`${BASE_BACKEND_URL}/applicantdata/store-application`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch(`${BASE_BACKEND_URL}/userdata/get-account`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          console.log(data.dataAccount[0]);
          // use data to populate the form
          nameRef.current.value = data.dataAccount[0].fullName;
          emailRef.current.value = data.dataAccount[0].email;
          setLoggedIn(true);
          console.log('logged in');
        }
        else {
          console.log('not logged in');
          setLoggedIn(false);
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }
    , []);

  return (
    <div>
      
      {!loggedIn && 
        <div className="sign-up-form">
         <div className="service-header" id="sign-up-header">You must be logged in to sign up for a service</div>
       </div>
      } 
      {/* keep this invisible until loggedIn === true */}
      
      <div className={`sign-up-form ${loggedIn ? '' : 'hidden'}`}>
        <form action="/store-application" id="form" 
          className="sign-up-form-boxes" method="POST" onSubmit={handleSubmit}>
          <div className="service-header" id="sign-up-header">Apply Today!</div>
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