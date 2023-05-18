// FILE OVERVIEW:
// this is a dev tool, and should be commented out in app.js when not on localhost
// this file is not accessable through the website unless you type in the right url
// The purpose of this file is to easilly sort through applications based on service

//react modules
import React, { useEffect, useState } from 'react';


// each individual application to display
function SearchResult(props) {
    const applicant = props.applicant;

    if (applicant.service === props.service.title) {
        return (
            <div key={props.index} className="result-container">
                <p className="applicant-name">{applicant.name}</p>
                <p className="applicant-email">{applicant.email}</p>
            </div>
        );
    } else {
        return undefined;
    }
};

// create the information required to display the page
function ApplicationPageDisplay(props) {
    const service = props.service;

    return (
        <section className="applicants">
            <div className="applicants-title">{service.title}</div>
            <div className="search-results">
                {props.applicants.map((applicant, index) => (
                    <SearchResult key={index} applicant={applicant} />
                ))}
            </div>
        </section>
    );
};

function ServiceApplicants() {
    localStorage.getItem('token')
    const [applicants, setApplicants] = useState([]);
    const [services, SetServices] = useState([]);

    useEffect(() => {
        if (token) {
            console.log('sending request');
            fetch('http://localhost:3000/Applications', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => setApplicants(data.Application))
                .then(data => SetServices(data.Services))
                .catch(error => {
                    // handle the error
                });
        } else {
            alert('There was an error verifying your account. Please log back in to view applicants.');
        }
    }, [token]);

    useEffect(() => {
        console.log(applicants);
    })

    return (
        <div className="container">
            <div className="container-title">
                Club Sign-ups
            </div>
            <div className="applicants" id="target">
                {services.map(service => {
                    <ApplicationPageDisplay service={service} applicants={applicants} />
                })}
            </div>
        </div>
    )
}

export default ServiceApplicants