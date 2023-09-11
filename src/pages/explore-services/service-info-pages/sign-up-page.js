import React, { useState, useEffect, useRef } from "react";
import { BASE_BACKEND_URL } from "../../../config.js";
import SignupPopup from "../../../components/SignupPopup.js";
import LoginPopup from "../../../components/LoginPopup.js";

function SignUpPage({ service }) {
  const [isShowingLoginPopup, setIsShowingLoginPopup] = useState(false);
  const [isShowingSignupPopup, setIsShowingSignupPopup] = useState(false);
  const [preventDebounce, setPreventDebounce] = useState(false); // prevents handle submit from being called twice
  // variable to record if the user is logged in or not
  const [loggedIn, setLoggedIn] = useState(true);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  const handleSubmit = (event) => {
    
    event.preventDefault();

    if (preventDebounce) {
      return;
    }
    setPreventDebounce(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to sign up for a service");
      return;
    }

    const formData = new FormData();
    const searchParams = new URLSearchParams(window.location.search);
    formData.append("service", searchParams.get("service"));
    formData.append("name", nameRef.current.value);
    formData.append("email", emailRef.current.value);
    if (phoneRef.current){
      formData.append("phone", phoneRef.current.value);
    };
    fetch(`${BASE_BACKEND_URL}/applicantdata/store-application`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        data = JSON.parse(data);
        console.log(data);
        if (data.success) {
          window.location.href = "/signup-success";
        }
        else{
          alert(data.error);
          // reset the preventDebounce variable
          setPreventDebounce(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function textWithLinksToParagraph(inputText) {
    try{
      const linkPattern = /(https?:\/\/[^\s]+)/g;

      const replacedText = inputText.replace(linkPattern, '<u><a target="_blank" href="$&">$&</a></u>');

      return `<p>${replacedText}</p>`;
    }
    catch{
      return inputText;
    }
  }

  function showLoginPopup() {
    setIsShowingLoginPopup(true);
    setIsShowingSignupPopup(false);
  }

  function showSignupPopup() {
    setIsShowingSignupPopup(true);
    setIsShowingLoginPopup(false);
  }

  function hidePopups() {
    setIsShowingLoginPopup(false);
    setIsShowingSignupPopup(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetch(
            `${BASE_BACKEND_URL}/userdata/get-account`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          console.log(data.dataAccount[0]);
          // use data to populate the form
          nameRef.current.value = data.dataAccount[0].fullName;
          emailRef.current.value = data.dataAccount[0].email;
          setLoggedIn(true);
          console.log("logged in");
        } else {
          console.log("not logged in");
          setLoggedIn(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {!loggedIn && (
        <div className="sign-up-form flex-col">
          <div className="service-header px-[5%] font-[500] text-center">
            Wanna Sign Up? Make a New Account today or Login to Start your
            Journey!
          </div>
          <button onClick={showSignupPopup} className="service-create-account">
            Create an Account
          </button>
        </div>
      )}
      {/* keep this invisible until loggedIn === true */}

      <div className={`sign-up-form ${loggedIn ? "" : "hidden"}`}>
        <form
          action="/store-application"
          id="form"
          className="sign-up-form-boxes"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="service-header" id="sign-up-header">
            {service.serviceType === "Internship" ? 
            ( <p>Click the Link Below To Apply Today</p> )
            :
              ( <p>Apply Today</p> )
            }

          </div>
          {/* if the service is an internship, show a link, otherwise, do the sign up form */}
          {service.serviceType === "Internship" ? (
            <div className="bg-[color:var(--secondary-color)] px-[30px] py-[20px] w-[100%] rounded-[20px] 
            flex justify-center items-center transition duration-300 hover:bg-[color:var(--dark-secondary-color)] 
            hover:text-[color:var(--accent-color)]">
              <div
                className="flex justify-center text-center items-center text-[20px] lr:text-[16px] md:text-[14px]"
                dangerouslySetInnerHTML={{
                  __html: textWithLinksToParagraph(service.internshipLink),
                }}
              ></div>
            </div>
          ) : (
            <div>
              {service.serviceType === "Program" 
              ? 
              <div>
                <div className="sign-up-form-container">
                  <div className="text-container" id="name-container">
                    <label htmlFor="name" className="sign-up-form-text">
                      {" "}
                      Full Name:{" "}
                    </label>
                    <input
                      type="text"
                      className="sign-up-form-input"
                      placeholder="First and Last Name"
                      ref={nameRef}
                      id="name"
                      name="name"
                      required
                    />
                    <br />
                  </div>

                  <div className="text-container" id="email-container">
                    <label htmlFor="email" className="sign-up-form-text">
                      {" "}
                      Email:{" "}
                    </label>
                    <input
                      type="email"
                      className="sign-up-form-input"
                      placeholder="School Email"
                      ref={emailRef}
                      id="email"
                      name="email"
                      required
                    />
                    <br />
                  </div>

                  {/* phone number */}
                  <div className="text-container" id="name-container">
                    <label htmlFor="phone" className="sign-up-form-text">
                      {" "}
                      Phone:{" "}
                    </label>
                    <input
                      type="phone"
                      className="sign-up-form-input"
                      placeholder="Phone Number"
                      ref={phoneRef}
                      id="email"
                      name="email"
                      required
                    />
                    <br />
                  </div>

                </div>

                <input
                  type="submit"
                  value="Submit"
                  className="service-submit-button"
                />
              </div> 
              : 
              <div>
                <div className="sign-up-form-container">
                  <div className="text-container" id="name-container">
                    <label htmlFor="name" className="sign-up-form-text">
                      {" "}
                      Full Name:{" "}
                    </label>
                    <input
                      type="text"
                      className="sign-up-form-input"
                      placeholder="First and Last Name"
                      ref={nameRef}
                      id="name"
                      name="name"
                      required
                    />
                    <br />
                  </div>

                  <div className="text-container" id="email-container">
                    <label htmlFor="email" className="sign-up-form-text">
                      {" "}
                      Email:{" "}
                    </label>
                    <input
                      type="email"
                      className="sign-up-form-input"
                      placeholder="School Email"
                      ref={emailRef}
                      id="email"
                      name="email"
                      required
                    />
                    <br />
                  </div>
                </div>

                <input
                  type="submit"
                  value="Submit"
                  className="service-submit-button"
                />
              </div>
              }
            </div>
          )}

          <br />
        </form>
      </div>

      <SignupPopup
        SetIsShowingSignupPopupFalse={() => {
          setIsShowingSignupPopup(false);
        }}
        isShowingSignupPopup={isShowingSignupPopup}
        showLoginPopup={showLoginPopup}
      />

      <LoginPopup
      showSignupPopup={showSignupPopup}
      isShowingLoginPopup={isShowingLoginPopup} />

      <div
        id="login-popup-background"
        className={isShowingLoginPopup || isShowingSignupPopup ? "" : "hidden"}
        onClick={hidePopups}
        style={{ cursor: "pointer" }}
      ></div>
    </div>
  );
}

export default SignUpPage;
