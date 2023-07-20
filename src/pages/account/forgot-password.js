import React, { useRef, useEffect, useState } from 'react';
import '../../../public/stylesheets/style.css';
import { BASE_BACKEND_URL } from '../../config';


function ForgotPasswordForm() {
  const [email, setEmail] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    console.log('Email submitted:', email);
      try {
        const response = await fetch(`${BASE_BACKEND_URL}/api/forgot-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        });
        const result = await response.json();

        if (result.status === 'ok') {
            //everything is a okay
            alert('Email to reset your password has been sent');
            window.location.href = '/';
        } else {
            console.log(result.error);
            alert(result.error);
            setEmail('');
        }
    } catch (error) {
        console.error(error);
        alert('An error ocurred while requesting reset.');
    }
  };

  const handleEmailChange = (event) => {
    const address = event.target.value;
    setEmail(address);
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <p>Enter the email address associated with you account</p>
            <input type='text' onChange={handleEmailChange} placeholder='email@example.com'></input>
            <button type='submit'>Send password reset link</button>
        </form>
    </div>
    
  );
}

export default ForgotPasswordForm;