import React, { useRef, useEffect, useState } from 'react';
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

  useEffect(() => 
  {
    document.title = 'Contact Form | Community ALI';
  }, []);

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
    <>
      <NavBar isFixedPage={false} />
      <div className = {'text-white flex flex-wrap justify-center pt-5 mb-20 max-[850px]:pt-[100px] lr:pt-[110px]'}>
        <div className = {'text-center mx-[12%] max-[480px]:mx-[30px]'}>
          <h1 id='contact-form-title'> Having Questions or Concerns? </h1>
          <h2 id='contact-form-subtitle'>
            We aim to create the best experience for our users and we appreciate all the feedback we can get.
            Send us a message and we'll respond if further assistance is needed!
          </h2>
        </div>

        <form className = 'bg-[color:var(--secondary-color)] px-[30px] py-[40px] w-[60%] mt-[50px] rounded-[15px] max-[1280px]:w-[80%] max-[480px]:w-[90%] max-[480px]:px-[20px] max-[480px]:py-[30px] lr:w-[80%] sm:w-[90%]'
        ref={form} onSubmit={sendMail}>
          <h1 className = {'font-[400] text-[28px] text-center mb-[30px] max-[480px]:text-[26px]'}>Contact form</h1>
          <div className = {'w-[100%] float-left'}>
            <div className = 'contact-form-group'>
              <label className = 'contact-form-label' htmlFor="name"> Full Name </label>
              <input
                type="text"
                className="contact-form-input"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className = "contact-form-group">
              <label className = "contact-form-label" htmlFor="email"> Email </label>
              <input
                type="email"
                className="contact-form-input"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="contact-form-group">
              <label className="contact-form-label" htmlFor="message"> Message </label>
              <textarea
                className="contact-form-message"
                id="message"
                rows="5"
                placeholder="Describe the concern or question you have"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            <input type="submit" value="Send" id="form-submit-button" className="btn btn-primary" />
          </div>
        </form>
      </div>

    </>
  );
}

export default ContactForm;
