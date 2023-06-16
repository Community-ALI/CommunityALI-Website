import React, { useRef, useState, useEffect } from "react";
import '../../../pages/my-services/add-service.css';

function FaqPage() {

    return(
        <div className="faq">
        <div id="faq-container">
            <div className="service-header" id="faq-title">
            Frequently Asked Questions
            </div>
            <div className="contacts-container">
                <div                 
                className="contacts-text-box"
                id="question-text-box">
                Do I need to know how to code in order to join Community ALI?
                </div>
                <div className="text-button-container">
                    <div                  
                    className="contacts-email-box"
                    id="answer-text-box">
                    Yes, if you are not as good as Mason at coding, we do
                    not want you on our team lmao XD XD get rekt kid.
                    </div>
                </div>
            </div>

            <div className="contacts-container">
                <div                 
                className="contacts-text-box"
                id="question-text-box">
                Do I need to know how to cook in order to join Community ALI?
                </div>
                <div className="text-button-container">
                    <div                  
                    className="contacts-email-box"
                    id="answer-text-box">
                    Yes, if you are not as good as Kirill in making amazing 
                    mashed potatoes, then we will kick you out lol lol bruh.
                    </div>
                </div>
            </div>

            <div className="contacts-container">
                <div                 
                className="contacts-text-box"
                id="question-text-box">
                Do I need to know how to drive in order to join Community ALI?
                </div>
                <div className="text-button-container">
                    <div                  
                    className="contacts-email-box"
                    id="answer-text-box">
                    Yes, if you are any better than Muhammad in driving to MJC,
                    then I will gladly feel safe entering your car to eat lunch.
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default FaqPage;