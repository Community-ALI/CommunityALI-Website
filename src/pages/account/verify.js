import React, { useRef, useEffect, useState } from 'react';
import '../../../public/stylesheets/style.css';
import NavBar from '../../components/NavBar';
import Footer from "../../components/Footer";
import { BASE_BACKEND_URL } from '../../config';


function VerificationForm() {
  const [verificationCode, setVerificationCode] = useState('');
  async function handleSubmit() {
    console.log('Verification code submitted:', verificationCode);
    const searchParams = new URLSearchParams(window.location.search);
    const username = searchParams.get('username');
      try {
        const response = await fetch(`${BASE_BACKEND_URL}/api/verify?username=${username}`, {
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
    <div>
      <p>Enter the 6 digit code sent to your email in order to verify that you own it</p>
        <input
          className="verification-code"
          type="text"
          placeholder="123456"
          value={verificationCode}
          onChange={handleVerificationCodeChange}
          maxLength={6}
        />
    </div>
    
  );
}

export default VerificationForm;



