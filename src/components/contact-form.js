import React, { useRef, useState } from 'react';
import './contact-form.css';
import NavBar from './NavBar';
import emailjs from 'emailjs-com';
import { useHistory } from 'react-router-dom';

function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function ContactForm() {
  const form = useRef();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendMail = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }

    const params = {
      name,
      email,
      message
    };

    const serviceID = 'service_gv6i9wn';
    const templateID = 'template_zn2vook';
    const userID = 'pn7YfOec7bHOKYp6Y';

    emailjs.send(serviceID, templateID, params, userID)
      .then((res) => {
        setName('');
        setEmail('');
        setMessage('');
        console.log(res);
        alert('Your message sent successfully!!');
        window.location.href = '/'
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <title> Contact Form </title>
      <NavBar isFixedPage={false} />
      <div className={'text-white flex flex-wrap justify-center pt-5 mb-20'}>
        <div id="contact-form-header">
          <h1 className="body-title">Having Questions or Concerns?</h1>
          <h2 className="body-subtitle">
            We aim to create the best experience for our users and we appreciate all the feedback we can get.
            Send us a message and we'll respond if further assistance is needed!
          </h2>
        </div>

        <form className="contact-us-container" ref={form} onSubmit={sendMail}>
          <h1 className="contact-form-title">Contact form</h1>
          <div className="contact-form-container">
            <div className="form-group">
              <label className="form-label" htmlFor="name"> Full Name </label>
              <input
                type="text"
                className="form-input"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email"> Email </label>
              <input
                type="email"
                className="form-input"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message"> Message </label>
              <textarea
                className="form-text-area"
                id="message"
                rows="5"
                placeholder="Your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            <input type="submit" value="Send" id="form-submit-button" className="btn btn-primary" />
          </div>
        </form>

        <h1 className="contact-form-second-title">Additional Contacts</h1>
        <div className="contact-form-container" id="right-form-container">
          <div className="form-email">
            Follow our Instagram: <a className="form-link" href="https://www.instagram.com/community_ali/" target="_blank">@community_ali</a>
          </div>
          <div className="form-email">
            Follow our Facebook: <a className="form-link" href="https://www.instagram.com/community_ali/" target="_blank">@Community_ALIs</a>
          </div>
          <div className="form-email">
            Follow our Twitter: <a className="form-link" href="https://www.facebook.com/profile.php?id=100089185347335&mibextid=ZbWKwL" target="_blank">Community Catalyst</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
