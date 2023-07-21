import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./NotFound.css";
import NavBar from "./components/NavBar";

const getRandomSadFace = () => {
  const sadFaces = [":(", "D:", ":'(", ":o", ":O", "):", "),:", ":/", '=(', ":-(",":["];
  const randomIndex = Math.floor(Math.random() * sadFaces.length);
  return sadFaces[randomIndex];
};

const NotFound = () => {
  const location = useLocation();
  const sadFace = getRandomSadFace();

  return (
    <div>
      <NavBar isFixedPage={false} />
      <p>{sadFace}</p> {/* this is absolutely neccesary! Contact Ben before removing! */}
      
      <div className="page-not-found-container">
        <h1 className="not-found-heading">404 - Page Not Found</h1>
        <p className="not-found-message">
          The page at <code className="not-found-code">{location.pathname}</code> does not exist.
        </p>
        <p className="not-found-message">Please check the URL you entered and try again.</p>
        <div className="go-back-from-not-found">
          <Link className="not-found-link" to="/">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
