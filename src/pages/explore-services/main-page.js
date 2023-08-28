import React from "react";
import "../../pages/explore-services/main-page.css";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import "../../components/loading-screen.css";
import "./service-filter.css";
import ServicesDisplay from "../../components/servicesDisplay/serviceDisplay.js";
import ServiceDropdown from "../../components/servicesDisplay/mobile-service-dropdown";

function Services(props) {
  return (
    <div className="w-[100vw]">
      <NavBar isFixedPage={false} />
      <div className="flex justify-center mt-4 lr:mt-32 w-[100%]">
        <ServicesDisplay  startingfilter={props.startingfilter}/>
      </div>
      <Footer />
    </div>
  );
}

export default Services;
