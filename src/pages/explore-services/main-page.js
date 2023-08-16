import React from "react";
import "../../pages/explore-services/main-page.css";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import "../../components/loading-screen.css";
import "./service-filter.css";
import ServicesDisplay from "../../components/servicesDisplay/serviceDisplay.js";

function Services(props) {
  return (
    <div>
      <NavBar isFixedPage={false} />
      <ServicesDisplay />
      <Footer />
    </div>
  );
}

export default Services;
