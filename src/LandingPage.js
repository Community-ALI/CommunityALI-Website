import React, { useState, useEffect } from 'react';
import LandingPageHeader from './pages/landing-page/LandingPageHeader';
import LandingPageCommunityAliInformation from './pages/landing-page/LandingPageCommunityAliInformation';
import LandingPageCatagories from './pages/landing-page/LandingPageCatagories';
import LandingPagePartners from './pages/landing-page/LandingPagePartners';
import NavBar from './components/NavBar';
import Footer from "./components/Footer";
import LandingPageSchools from './pages/landing-page/LandingPageSchools';

function LandingPage() {

    return (
        <div>
            <div className="overflow-auto">
                <title> Community ALI - Modesto Junior College </title>
                <NavBar isFixedPage={true}/>
                <LandingPageHeader />
                <LandingPageCatagories />
                <LandingPageSchools />
                <LandingPagePartners />
                {/* <LandingPageCommunityAliInformation />  */}
                <Footer />
            </div>
        </div>
        );
}

export default LandingPage;