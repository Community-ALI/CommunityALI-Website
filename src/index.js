import React from "react";
import { createRoot } from 'react-dom/client';
import LandingPage from "./LandingPage";
import Services from "./pages/explore-services/Services";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />}/>
                <Route path="/services" element={<Services />}/>
            </Routes>
        </BrowserRouter>
    )
}

createRoot(document.getElementById('root')).render(
        <App />
    );