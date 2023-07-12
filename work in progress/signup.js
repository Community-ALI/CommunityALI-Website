import React from 'react';
import {BASE_BACKEND_URL} from '../src/config.js'

const SignupButton = () => {
  const handleSignup = () => {
    // Send a signup request to your Node.js server
    const response = fetch(`${BASE_BACKEND_URL}/get-signup-link`, {
      method: 'POST',
      })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log(data);
        // You can redirect the user or show a success message here
      })
      .catch((error) => {
        // Handle any errors that occur during the signup request
        console.error(error);
      });
  };

  return (
    <button onClick={handleSignup}>
      Sign up
    </button>
  );
};

export default SignupButton;