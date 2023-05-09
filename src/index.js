import React from "react";
import { createRoot } from 'react-dom/client';
import LandingPage from "./LandingPage";
import Services from "./pages/explore-services/Services";
import MyServicesHome from "./pages/my-services/MyServicesHome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import mongoose from "mongoose";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />}/>
                <Route path="/services" element={<Services />}/>
                <Route path="/my-services" element={<MyServicesHome />}/>
            </Routes>
        </BrowserRouter>
    )
}

createRoot(document.getElementById('root')).render(
        <App />
    );