import React, { useRef, useEffect, useState } from 'react';
import '../../../public/stylesheets/style.css';
import NavBar from '../../components/NavBar';
import Footer from "../../components/Footer";
import { BASE_BACKEND_URL } from '../../config';
import './verify.css';


function VerificationForm() {
  const [verificationCode, setVerificationCode] = useState('');
  async function handleResendCode(){
    console.log('requesting new code');
    const searchParams = new URLSearchParams(window.location.search);
    const username = searchParams.get('username');
    console.log(username);
      try {
        const response = await fetch(`${BASE_BACKEND_URL}/userdata/api/resend-code?username=${username}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
        });
        const result = await response.json();

        if (result.status === 'ok') {
            //everything is a okay
            alert('New code sent');

        } else {
            console.log(result.error);
            alert(result.error);
        }
    } catch (error) {
        console.error(error);
        alert('An error ocurred while sending a new code.');
    }
  }

  async function handleDeleteAccount(){
    console.log('deleting account and moving back to account creation');
    const searchParams = new URLSearchParams(window.location.search);
    const username = searchParams.get('username');
    console.log(username);
      try {
        const response = await fetch(`${BASE_BACKEND_URL}/userdata/api/delete-unverified-account?username=${username}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
        });
        const result = await response.json();

        if (result.status === 'ok') {
            //everything is a okay
            alert('Please retry account creation.  Make sure to use an email you have access to.');
            window.location.href='/'

        } else {
            console.log(result.error);
            alert(result.error);
        }
    } catch (error) {
        console.error(error);
        alert('An error ocurred while removing your unverified account. If the problem persists, please contact us.');
    }
  }

  async function handleSubmit() {
    console.log('Verification code submitted:', verificationCode);
    const searchParams = new URLSearchParams(window.location.search);
    const username = searchParams.get('username');
      try {
        const response = await fetch(`${BASE_BACKEND_URL}/userdata/verify?username=${username}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verificationCode }),
        });
        const result = await response.json();

        if (result.status === 'ok') {
            //everything is a okay
            localStorage.setItem('token', result.data);
            const decodedToken = JSON.parse(atob(result.data.split('.')[1]));
            console.log('signed in as: '+ decodedToken.username);
            alert('account created!');
            window.location.href = '/';
        } else {
            console.log(result.error);
            alert(result.error);
            setVerificationCode('');
        }
    } catch (error) {
        console.error(error);
        alert('An error ocurred while verifying your account.');
    }
  };

  const handleVerificationCodeChange = (event) => {
    const code = event.target.value;
    setVerificationCode(code);
  }

  useEffect(() => {
    if (verificationCode.length === 6) {
      handleSubmit();
    }
  }, [verificationCode]);

  return (
    <div className='verification-container'>
      <div className='verification-title'> Almost done! Let's Verify your New Account </div>
      <div className="verification-text">Enter the 6 digit code sent to your email in order to verify that you own it</div>
      <div className='verification-code-container'>
        <div className='verification-security-text'> Security Code: </div>
          <input
            className="verification-code"
            type="number"
            placeholder="######"
            value={verificationCode}
            onChange={handleVerificationCodeChange}
            maxLength={6}
          />
      </div>
      <div className="verification-no-code">Didn't Receive the Code? 
        <button className="verification-link" onClick={handleResendCode}>Request another one </button> 
      </div>
      <div className='verification-no-code'> Entered invalid email when signing up?
        <button className="verification-link" onClick={handleDeleteAccount}>Return to account creation </button> 
      </div>

      <div className='verification-problems-container'>
        <div className='verification-problems-title'> Still Facing Problems? Click below </div>
        <div className='verification-problems-link'>
          <a href='contact-form'>Technical Support </a>
        </div>
      </div>
    </div>
    
  );
}

export default VerificationForm;



