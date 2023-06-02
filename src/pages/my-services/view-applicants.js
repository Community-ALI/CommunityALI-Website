//react modules
import React, { useEffect, useState } from 'react';
import './view-applicants.css'
import '../../../public/stylesheets/style.css'
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar';
import Notifications from '../../components/Notification';
function convertToNormalTime(armyTime) {
    const [hours, minutes, seconds] = armyTime.split(':');
    let period = 'am';

    let normalizedHours = parseInt(hours, 10);
    if (normalizedHours > 12) {
        normalizedHours -= 12;
        period = 'pm';
    }

    const formattedHours = normalizedHours.toString();
    const formattedMinutes = minutes.padStart(2, '0');

    return `${formattedHours}:${formattedMinutes} ${period}`;
}

// each individual application to display
const SearchResult = function (props) {
    const applicant = props.applicant;
    var normalTime = 'long ago';
    if (applicant.time) {
        normalTime = convertToNormalTime(applicant.time);
    }
    return (
        <div className="applicants-result-container">
            <Notifications notifications={(applicant.is_new_applicant) ? 1 : 0} />
            <p className="applicant-name">{applicant.name}</p>
            <p className="applicant-email">{applicant.email}</p>
            <p className="applicant-time">{applicant.date}</p>
            <p className="applicant-time">{normalTime}</p>
        </div>
    );
};


//   const application_page_display = function(props) {
//     const results = props.results;
//     const service = props.service;

//     return (
//       <section className="applicants">
//         <div className="applicants-title">{service.title}</div>
//         <div className="search-results">
//           {results.map(function(applicant) {
//             return (
//               <SearchResult
//                 applicant={applicant}
//                 service={service}
//                 key={applicant.name}
//               />
//             );
//           })}
//         </div>
//       </section>
//     );
//   };


// create the information required to display the page
function ApplicationPageDisplay(props) {
    const serviceName = props.serviceName;

    return (
        <section className="applicants">
            <div className="applicants-title">{serviceName}</div>
            <div className="search-results">
                {props.applicants.map((applicant, index) => (
                    <SearchResult
                        key={index}
                        applicant={applicant}
                        notificaiton={false} /> //TODO fill this with is applicant new bool for notification to show up to connect it to back end
                ))}
            </div>
        </section>
    );
};

function ServiceApplicants() {
    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const queryString = window.location.search;
                    const urlParams = new URLSearchParams(queryString);
                    const serviceName = urlParams.get('service');
                    const response = await fetch('http://localhost:3000/get-service-applicants?service=' + serviceName,
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        .then(response => response.json())
                        .then(data => {
                            // 'data' variable will contain the received object with the data array and tokenUsername

                            setApplicants(data);
                            console.log('data: ', data);
                        })
                }
                else {
                    console.log('no token found')
                }
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.log(applicants);
    })
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const serviceName = urlParams.get('service');
    return (
        <div>
            <NavBar></NavBar>,
            <div className="container">
                <div className="applicants-container-title">
                    Club Sign-ups
                </div>
                <div className="applicants" id="target">
                    <ApplicationPageDisplay
                        serviceName={serviceName}
                        applicants={applicants} />
                </div>
            </div>
        </div>
    )
}

export default ServiceApplicants