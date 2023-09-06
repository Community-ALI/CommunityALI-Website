import React, { useEffect, useState, useRef } from "react";
import { BASE_BACKEND_URL } from "../config.js";
import { Link } from "react-router-dom";
import { Buffer } from "buffer";

const UserProfileCircle = (Logout) => {
  const [username, setUsername] = useState("Loading Username...");
  const dropdownRef = useRef(null);
  const dropdownIconRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        var token = localStorage.getItem("token");
        if (token) {
          const response = await fetch(
            `${BASE_BACKEND_URL}/userdata/get-username`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              setUsername(data.tokenUsername);
            });
        } else {
          console.log("no token found");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const [imageUrl, setImageUrl] = useState("photos-optimized/user-pic.png");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileImage = localStorage.getItem("profileImage");
        if (profileImage) {
          setImageUrl(profileImage);
        } else {
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
            var imageUrl;
            try {
              const buffer = Buffer.from(data.dataAccount[0].profileImage.data);
              const base64 = buffer.toString("base64");
              imageUrl = `data:image/png;base64,${base64}`;
            } catch (err) {
              console.log(err);
              console.log("no profile image, using default");
              imageUrl = "photos-optimized/user-pic.png";
            }
            setImageUrl(imageUrl);
            localStorage.setItem("profileImage", imageUrl);
          } else {
            console.log("error: not logged in");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const [showDropdown, setShowDropdown] = useState(false);

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };

  function Logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("profileImage");
    window.location.href = "/";
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        event.target !== dropdownIconRef.current
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="user-profile-circle relative">
      <img
        className="user-profile-image"
        src={imageUrl}
        alt={username}
        onClick={toggleDropdown}
        ref={dropdownIconRef}
      />
      <div
        ref={dropdownRef}
        className={`rounded-lg flex flex-col absolute dropdown-menu bg-ali-darkblue left-[-100px] py-4 --tw-shadow-color: #000
      top-16 transition-opacity duration-300 z-50 w-[165px] ${
        showDropdown ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      >
        <a
          className="transition-colors text-regal-blue flex justify-center items-center hover:bg-[#00468D] px-4 py-3"
          href="/profile"
        >
          <i className="fa-solid fa-user" style={{ color: "#ffffff" }}></i>
          <p className="px-4 text-white">Profile</p>
        </a>

          <Link
            className="transition-colors text-regal-blue flex justify-center items-center hover:bg-[#00468D] px-4 py-3"
            to="/inbox"
          >
            <i className="fa-solid fa-inbox" style={{ color: "#ffffff" }}></i>
            <p className="px-4 text-white">Inbox</p>
          </Link>

        <button
          onClick={Logout}
          className=" transition-colors flex justify-center items-center hover:bg-[#00468D] px-4 py-3"
        >
          <i
            className="fa-solid fa-right-from-bracket"
            style={{ color: "#ffffff" }}
          ></i>
          <p className="px-4 text-white">Logout</p>
        </button>
      </div>
    </div>
  );
};

export default UserProfileCircle;
