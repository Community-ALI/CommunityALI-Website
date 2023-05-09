import React from "react";
import { createRoot } from 'react-dom/client';
import LandingPage from "./LandingPage";
import MyServicesHome from "./pages/my-services/MyServicesHome";
import Services_Main_Page from "./pages/explore-services/main-page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import mongoose from "mongoose";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />}/>
                <Route path="/my-services" element={<MyServicesHome />}/>
                <Route path="/services" element={<Services_Main_Page />}/>
            </Routes>
        </BrowserRouter>
    )
}

createRoot(document.getElementById('root')).render(
        <App />
    );