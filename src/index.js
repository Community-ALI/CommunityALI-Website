import React from "react";
import { createRoot } from 'react-dom/client';
import LandingPage from "./LandingPage";
import MyServicesHome from "./pages/my-services/MyServicesHome";
import Services_Main_Page from "./pages/explore-services/main-page";
import View_Services from "./pages/explore-services/service-info";
import Signup_Success from "./pages/explore-services/signup-success";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import mongoose from "mongoose";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />}/>
                <Route path="/my-services" element={<MyServicesHome />}/>
                <Route path="/services" element={<Services_Main_Page />}/>
                <Route path="/service-info" element={<View_Services />}/>
                <Route path="/signup-success" element={<Signup_Success />}/>
            </Routes>
        </BrowserRouter>
    )
}

createRoot(document.getElementById('root')).render(
        <App />
    );