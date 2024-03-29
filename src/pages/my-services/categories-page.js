import React, {useState, useEffect } from "react";
import "./categories-page.css";
import "../../../public/stylesheets/style.css";
import NavBar from "../../components/NavBar";
import { BASE_BACKEND_URL } from "../../config.js";

function CategoriesPage() {
  
  useEffect(() => 
  {
    document.title = 'Service Category | Community ALI';
  }, []);
  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      await fetch(`${BASE_BACKEND_URL}/userdata/check-permissions`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        setPermissions(data);
        const loaderWrapper = document.querySelector(".loader-wrapper");
        loaderWrapper.style.transition = "opacity 0.5s";
        loaderWrapper.style.opacity = "0";
        setTimeout(() => {
          loaderWrapper.style.display = "none";
        }, 500);
      });
    }
    fetchData();
  }
  , []);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);
  useState(() => {
      console.log(window.innerWidth);
      window.addEventListener('resize', (() => {
          setIsMobile(window.innerWidth <= 850)
      }));
  })

  return (
    <div>
      {isMobile ?
      <NavBar isFixedPage={false} hideMobileSearchBar={true} /> :
      <NavBar isFixedPage={false} />
      }
      <div className="service-categories-container">
        <div className="category-container-title">
          <p className="mb-[15px]">Select the Category of Your New Service</p>
          <hr className="border-[1.5px] w-[95%]"/>
        </div>

        {/* Box 1 */}
        {permissions.clubAdmin ? (
          <a className="category-container" href="/add-club">
            <p className="category-header">Add an MJC Club</p>
            <p className="category-text">
              Looking to bring more than just books and classes? Posting an MJC
              student club offers great ways to enrich a student's academic
              experience with new activities and friends. A club can focus on
              anything from careers, recreation, athletics, and more!
            </p>
          </a>
        ) : (
          <div className="category-container-unselectable">
            <p className="category-header">Add an MJC Club</p>
            <p className="category-text">
              You do not have permission to add an MJC Club.
            </p>
          </div>
        )}

        {/* Box 2
        {decodedToken.eventAdmin ? (
          <a className="category-container" href="/add-event">
            <p className="category-header">Add a Local Event</p>
            <p className="category-text">
              Bring more life to MJC by posting an event to enhance a student's
              college experience. This involves both on-campus and off-campus
              events such as concerts, BBQs, conferences, political awareness
              booths, multi-cultural affairs, free films, and more!
            </p>
          </a>
        ) : (
          <div className="category-container-unselectable">
            <p className="category-header">Add a Local Event</p>
            <p className="category-text">
              You do not have permission to add a local event.
            </p>
          </div>
        )} */}

          {/* Box 2 */}
          {permissions.programAdmin ? (
          <a className="category-container" href="/add-program">
            <p className="category-header">Add an MJC Program</p>
            <p className="category-text">
              Promote programs, support, and other resources of student aid by posting a
              student resource for students to find. This includes on-campus or off-campus settings, and can be entirely based on the student's 
              financial situation, major, cultural background, and more!
            </p>
          </a>
        ) : (
          <div className="category-container-unselectable">
            <p className="category-header">Add an MJC Program</p>
            <p className="category-text">
              You do not have permission to add a student resource.
            </p>
          </div>
        )}

        {/* Box 3 */}
        {permissions.volunteerAdmin ? (
          <a className="category-container" href="/add-volunteer">
            <p className="category-header">Add Volunteering</p>
            <p className="category-text">
              Promote acts of civic engagement and community by posting a
              volunteer activity for students to explore. This consists of a
              variety of projects such as campus beautification, cleanups, food
              donations, fundraising, appreciation, and more!
            </p>
          </a>
        ) : (
          <div className="category-container-unselectable">
            <p className="category-header">Add Volunteering</p>
            <p className="category-text">
              You do not have permission to add volunteering activities.
            </p>
          </div>
        )}

        {/* Box 4 */}
        {permissions.internshipAdmin ? (
          <a className="category-container" href="/add-internship">
            <p className="category-header">Add an Internship</p>
            <p className="category-text">
              Including both paid and unpaid internships, they are very valuable
              to students looking for practical experience related to their
              career interest. This can involve any boot camps, virtual
              internships, work research, college programs, and more!
            </p>
          </a>
        ) : (
          <div className="category-container-unselectable">
            <p className="category-header">Add an Internship</p>
            <p className="category-text">
              You do not have permission to add an internship.
            </p>
          </div>
        )}
      </div>
      <div className="loader-wrapper">
          <span className="loader">
            <span className="loader-inner"></span>
          </span>
        </div>
    </div>
  );
}

export default CategoriesPage;
