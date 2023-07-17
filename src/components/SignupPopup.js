import React, { useState } from 'react';
import { BASE_BACKEND_URL } from '../config.js';
import './login.css';

function SignupPopup(props) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSwitchToLogin = () => {
    props.setIsShowingSignupPopup(false); // Call the parent component's state update function
  };

  async function signup(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const authData = { email, username, password };

    try {
      const response = await fetch(`${BASE_BACKEND_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authData),
      });
      const result = await response.json();

      if (result.status === 'ok') {
        console.log('Signed up successfully');
        // Handle successful signup
        window.location.href = `/verify?username=${username}`
      } else {
        console.log(result.error);
        alert(result.error);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while signing up.');
    }
  }

  return (
    <div className='container-login'>
      <div className="container-for-login">
        <h1>Sign Up</h1>
        <form id="signup" onSubmit={signup}>
          <div className="text-field">
            <input
              autoComplete="new-email"
              className="text-field-input"
              id="email"
              required=""
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
            <span className={`text-field-span${email !== '' ? ' focused-field' : ''}`}></span>
            <label className={`text-field-label${email !== '' ? ' focused-field' : ''}`} htmlFor="email">Email</label>
          </div>
          <div className="text-field">
            <input
              autoComplete="new-username"
              className="text-field-input"
              id="username"
              required=""
              onChange={e => {
                setUsername(e.target.value);
              }}
            />
            <span className={`text-field-span${username !== '' ? ' focused-field' : ''}`}></span>
            <label className={`text-field-label${username !== '' ? ' focused-field' : ''}`} htmlFor="username">Username</label>
          </div>
          <div className="text-field">
            <input
              autoComplete="new-password"
              className="text-field-input"
              type="password"
              id="password"
              required=""
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
            <span className={`text-field-span${password !== '' ? ' focused-field' : ''}`}></span>
            <label className={`text-field-label${password !== '' ? ' focused-field' : ''}`} htmlFor="password">Password</label>
          </div>
          <div className="text-field">
            <input
              autoComplete="new-password-2"
              className="text-field-input"
              type="password"
              id="confirmPassword"
              required=""
              onChange={e => {
                setConfirmPassword(e.target.value);
              }}
            />
            <span className={`text-field-span${confirmPassword !== '' ? ' focused-field' : ''}`}></span>
            <label className={`text-field-label${confirmPassword !== '' ? ' focused-field' : ''}`} htmlFor="confirmPassword">Confirm Password</label>
          </div>

          <input
            type="submit"
            value="Sign Up"
            id='signup-submission'
            className="login-submit-button"
          />
          <div className="signup_link">
            <p>Already have an account? </p>
            <button style={{ color: 'blue', textDecoration: 'underline' }} onClick={handleSwitchToLogin}>Login</button>
          </div>
          <div className="signup_link">
            Do you own a club and can't log into your account? Contact us - techsupport@communityali.org
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupPopup;
