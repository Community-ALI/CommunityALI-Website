import React, { Component, useEffect, useState} from 'react';
import '../pages/explore-services/main-page.css'
import NavBar from '../components/NavBar';
import Footer from "../components/Footer";
const Buffer = require('buffer').Buffer;


function RegistrationForm() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (password !== passwordConfirm) {
        alert('Passwords do not match!');
        return;
      }
  
      try {
        const response = await fetch('http://localhost:3000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username,
            email,
            password
          })
        });
        const result = await response.json();
  
        if (result.status === 'ok') {
          alert('Success');
        } else {
          alert(result.error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <div>
        <h1>Registration</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            autoComplete="off"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            type="text"
            autoComplete="off"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
          <input
            type="password"
            autoComplete="off"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <input
            type="password"
            autoComplete="off"
            id="password-confirm"
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChange={(event) => setPasswordConfirm(event.target.value)}
            required
          />
          <input type="submit" value="Submit Form" />
        </form>
      </div>
    );
  }

export default RegistrationForm;