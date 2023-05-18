import React from "react";
import { createRoot } from 'react-dom/client';
import LandingPage from "./LandingPage";

import Services_Main_Page from "./pages/explore-services/main-page";
import View_Services from "./pages/explore-services/service-info";
import Signup_Success from "./pages/explore-services/signup-success";

import My_Services_Main_Page from "./pages/my-services/main-page";
import Add_Service from "./pages/my-services/add-service";
import View_Applicants from "./pages/my-services/view-applicants";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />}/>
                
                {/* explore services pages */}
                <Route path="/services" element={<Services_Main_Page />}/>
                <Route path="/service-info" element={<View_Services />}/>
                <Route path="/signup-success" element={<Signup_Success />}/>

                {/* my services pages */}
                <Route path="/my-services" element={<My_Services_Main_Page />}/>
                <Route path="/add-service" element={<Add_Service />}/>
                <Route path="/view-applicants" element={<View_Applicants />}/>
            </Routes>
        </BrowserRouter>
    )
}

createRoot(document.getElementById('root')).render(
        <App />
    );