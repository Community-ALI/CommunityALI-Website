import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";

export default function NavbarMobileHidden()
{
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);
    useState(() => {
        console.log(window.innerWidth);
        window.addEventListener('resize', (() => {
            setIsMobile(window.innerWidth <= 850)
        }));
    })

    return(
    <>
        {isMobile ?
            <NavBar isFixedPage={false} hideMobileSearchBar={true} /> :
            <NavBar isFixedPage={false} />
        }
    </>
    )
}