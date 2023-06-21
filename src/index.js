import React from "react";
import { createRoot } from 'react-dom/client';

import LandingPage from "./LandingPage";
import ContactForm from "./components/contact-form";

import Services_Main_Page from "./pages/explore-services/main-page";
import View_Services from "./pages/explore-services/service-info-pages/club-info";
import Signup_Success from "./pages/explore-services/signup-success";

import My_Services_Main_Page from "./pages/my-services/main-page";
import Add_Service from "./pages/my-services/categories-page";
import Add_Club from "./pages/my-services/club-components/add-club";
import Add_Event from "./pages/my-services/event-components/add-event";
import Add_Volunteer from "./pages/my-services/vol-components/add-volunteer";
import Add_Internship from "./pages/my-services/intern-components/add-intern";
import Edit_Service from "./pages/my-services/club-components/edit-club";
import View_Applicants from "./pages/my-services/view-applicants";
import Register from "./pages/register";
import Profile from "./components/profile";

import './style.scss';
import '../public/stylesheets/style.css'



import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>

            <Routes>
 
                {/* explore services pages */}
                <Route path="/services" element={<Services_Main_Page />}/>
                <Route path="/service-info" element={<View_Services />}/>
                <Route path="/signup-success" element={<Signup_Success />}/>

                {/* my services pages */}
                <Route path="/my-services" element={<My_Services_Main_Page />}/>
                <Route path="/categories-page" element={<Add_Service />}/>
                <Route path="/add-club" element={<Add_Club />}/>
                <Route path="/add-event" element={<Add_Event />}/>
                <Route path="/add-volunteer" element={<Add_Volunteer />}/>
                <Route path="/add-intern" element={<Add_Internship />}/>
                <Route path="/edit-service" element={<Edit_Service />}/>
                <Route path="/view-applicants" element={<View_Applicants />}/>
                <Route path="/register" element={<Register />}/>

                <Route path="/profile" element={<Profile />}/>

                {/* other */}
                <Route path="/" element={<LandingPage />}/>
                <Route path="/contact-form" element={<ContactForm/>}/>
            </Routes>
        </BrowserRouter>
    )
}

createRoot(document.getElementById('root')).render(
        <App />
    );