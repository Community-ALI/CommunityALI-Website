import React from "react";
import LandingPageHeader from './pages/landing-page/LandingPageHeader';
import LandingPageCommunityAliInformation from './pages/landing-page/LandingPageCommunityAliInformation';
import LandingPageCatagories from './pages/landing-page/LandingPageCatagories';
import LandingPagePartners from './pages/landing-page/LandingPagePartners';
import NavBar from './components/NavBar';
import Footer from "./components/Footer";

function LandingPage() {
    return (
        <div className="overflow-auto">
            <NavBar isFixedPage={true} />
            <LandingPageHeader />
            <LandingPageCatagories />
            <LandingPageCommunityAliInformation />
            <LandingPagePartners />
            <Footer />
        </div>
    )
}

export default LandingPage;