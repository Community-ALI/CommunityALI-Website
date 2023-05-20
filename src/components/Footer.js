import React, { Component } from 'react';
import './footer.css'

function Footer() {
    return(
        <footer>
            <div className="footer-container">
                <a 
                    href="https://www.facebook.com/profile.php?id=100089185347335&amp;mibextid=ZbWKwL" 
                    target="_blank">               
                    <i 
                        className="fa fa-facebook fa-lg white-text mr-md-5 mr-3 fa-4x" 
                        aria-hidden="true">
                    </i>
                </a>
                <a 
                    href="https://twitter.com/Community_ALIs" 
                    target="_blank">
                    <i 
                        className="fa fa-twitter fa-lg white-text mr-md-5 mr-3 fa-4x" 
                        aria-hidden="true">
                    </i>            
                </a>            
                <a 
                    href="https://www.instagram.com/community_ali/" 
                    target="_blank">            
                    <i 
                        className="fa fa-instagram fa-lg white-text mr-md-5 mr-3 fa-4x" 
                        aria-hidden="true">
                    </i>            
                </a>     
                <a id="tech-support" href="/contact-form"> Technical Support </a>   
            </div>        
            <div 
                className="footer-text">
                <p>
                     Copyright © 2023 Community Catalyst. All Rights Reserved. Community Catalyst is not directly affiliated with MJC or any of its subsidiaries. 
                </p>        
            </div>    
        </footer>
    )
}

export default Footer;