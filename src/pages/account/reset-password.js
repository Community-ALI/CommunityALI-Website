import React, { useRef, useEffect, useState } from 'react';
import '../../../public/stylesheets/style.css';
import { BASE_BACKEND_URL } from '../../config';


function resetPasswordForm() {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  async function handleSubmit(event) {
    event.preventDefault();
    const querry = new URLSearchParams(window.location.search);
    const token = querry.get('token');
    console.log(token);
    if (password != password2){
        alert('passwords do not match');
        return
    }
      try {
        const response = await fetch(`${BASE_BACKEND_URL}/api/update-password?token=${token}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password })
        });
        const result = await response.json();

        if (result.status === 'ok') {
            //everything is a okay
            alert('Your password has been updated! You can use your new password to login.');
            window.location.href = '/';
        } else {
            console.log(result.error);
            alert(result.error);
        }
    } catch (error) {
        console.error(error);
        alert('An error ocurred while requesting reset.');
    }
  };

  const handlePasswordChange = (event) => {
    const code = event.target.value;
    setPassword(code);
  }

  const handlePasswordChange2 = (event) => {
    const code = event.target.value;
    setPassword2(code);
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className=''>Enter your new password</div>
            <input autoComplete='new-password' type='password' onChange={handlePasswordChange} placeholder='Password' value={password}></input>
            <p>Confirm new password</p>
            <input autoComplete='new-password' type='password' onChange={handlePasswordChange2} placeholder='Confirm password' value={password2}></input>
            <button autoComplete='false' type='submit'>Submit password</button>
        </form>
    </div>
    
  );
}

export default resetPasswordForm;