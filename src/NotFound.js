import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./NotFound.css"; 
import NavBar from "./components/NavBar";

const NotFound = () => {
  const location = useLocation();

  return (
    <div>

        <NavBar isFixedPage={true} />

        <div className="not-found-container">
            
            <h1 className="not-found-heading">404 - Page Not Found</h1>
            <p className="not-found-message">
                The page at <code className="not-found-code">{location.pathname}</code> does not exist.
            </p>
            <p className="not-found-message">Please check the URL you entered and try again.</p>
            <Link className="not-found-link" to="/">
                Go back to the home page
            </Link>
        </div>
    </div>
  );
};

export default NotFound;

