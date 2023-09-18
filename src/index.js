import React from "react";
import { createRoot } from "react-dom/client";

import LandingPage from "./LandingPage";
import ContactForm from "./components/contact-form";

import Services_Main_Page from "./pages/explore-services/main-page";
import View_Services from "./pages/explore-services/service-info-pages/club-info";
import Signup_Success from "./pages/explore-services/signup-success";

import My_Services_Main_Page from "./pages/my-services/main-page";
import Add_Service from "./pages/my-services/categories-page";
import Add_Club from "./pages/my-services/club-components/add-club";
import Add_Event from "./pages/my-services/event-components/add-event";
import Add_Program from "./pages/my-services/program-components/add-program";
import Add_Volunteer from "./pages/my-services/vol-components/add-volunteer";
import Add_Internship from "./pages/my-services/internship-components/add-internship";
import Edit_Service from "./pages/my-services/edit-service";
import Edit_Club from "./pages/my-services/club-components/edit-club";
import Edit_Internship from "./pages/my-services/internship-components/edit-internship";
import Edit_Program from "./pages/my-services/program-components/edit-program";
import View_Applicants from "./pages/my-services/view-applicants";
import Profile from "./pages/account/profile";
import Verify from "./pages/account/verify";
import Forgot_Password from "./pages/account/forgot-password";
import Reset_Password from "./pages/account/reset-password";
import NotFound from "./components/NotFound";
import SignupPopup from "./components/SignupPopup";
import ManagementSelectionPage from "./pages/administrator/managementSelectionPage";
import Administration from "./pages/administrator/administration";
import Unsubscribe from "./pages/account/unsubscribe";
import SaveServices from "./pages/account/save-services";

import "./style.scss";
import "../public/stylesheets/style.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MemberManagement from "./pages/my-services/memberManagement";
import Inbox from "./pages/inbox";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* explore services pages */}
        <Route
          path="/services"
          element={<Services_Main_Page startingfilter={"all"} />}
        />
        <Route
          path="/services-clubs"
          element={<Services_Main_Page startingfilter={"Club"} />}
        />
        <Route
          path="/services-internships"
          element={<Services_Main_Page startingfilter={"Internship"} />}
        />
        <Route
          path="/services-programs"
          element={<Services_Main_Page startingfilter={"Program"} />}
        />
        <Route path="/service-info" element={<View_Services />} />
        <Route path="/signup-success" element={<Signup_Success />} />
        <Route path="/SignupPopup" element={<SignupPopup />} />

        {/* administrator pages */}
        <Route
          path="/administrator-my-service-selection"
          element={<ManagementSelectionPage />}
        />
        <Route path="/administration" element={<Administration />} />

        {/* my services pages */}
        <Route path="/my-services" element={<My_Services_Main_Page />} />
        <Route path="/categories-page" element={<Add_Service />} />
        <Route path="/view-applicants" element={<View_Applicants />} />
        <Route path="/add-volunteer" element={<Add_Volunteer />} />
        <Route path="/add-internship" element={<Add_Internship />} />
        <Route path="/add-program" element={<Add_Program />} />
        <Route path="/edit-service" element={<Edit_Service />} />
        <Route path="/member-management" element={<MemberManagement />} />

        {/* service posting */}
        <Route path="/add-club" element={<Add_Club />} />
        <Route path="/add-event" element={<Add_Event />} />
        <Route path="/edit-club" element={<Edit_Club />} />
        <Route path="/edit-internship" element={<Edit_Internship />} />
        <Route path="/edit-program" element={<Edit_Program />} />

        {/* account pages */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/forgot-password" element={<Forgot_Password />} />
        <Route path="reset-password" element={<Reset_Password />} />
        <Route path="/unsubscribe" element={<Unsubscribe />} />

        {/* other */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact-form" element={<ContactForm />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/save-services" element={<SaveServices />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<App />);
