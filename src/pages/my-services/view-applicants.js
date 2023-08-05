//react modules
import React, { useEffect, useState } from 'react';
import {BASE_BACKEND_URL} from '../../config.js'
import './view-applicants.css'
import '../../../public/stylesheets/style.css'
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
    const [isNotification, setIsNotification] = useState(applicant.is_new_applicant);
    var normalTime = 'long ago';
    if (applicant.time) {
        normalTime = convertToNormalTime(applicant.time);
    }

    useEffect(() => {
        if (isNotification) {
            fetch(`${BASE_BACKEND_URL}/applicantdata/change_notification_status/` + applicant._id, {
                method: 'POST',
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    // Handle the response data
                })
                .catch(error => {
                    console.error(error);
                    // Handle the error
                });
        }
    }, [])

    return (
        
        <tr className="applicants-result-container">
                 <Notifications styleLeft={true} notifications={(isNotification) ? 1 : 0} />
                 
                <td data-label="name" className="applicant-name">{applicant.name}</td>
                <td data-label="email"  className="applicant-email">{applicant.email}</td>
                <td data-label="date"  className="applicant-date">{applicant.date}</td>
                <td data-label="time"  className="applicant-time">{normalTime}</td>
        </tr>
    );
};


// create the information required to display the page
function ApplicationPageDisplay(props) {
    const serviceName = props.serviceName;

    return (
        <section className="applicants">
            <div className="applicants-title">{serviceName}</div>
            <table className="search-results">
            
            <thead>
                    <tr>
                        <th className='applicant-name'>Name</th>
                        <th className='applicant-email'>Email</th>
                        <th className='applicant-date'>Date</th>
                        <th className='applicant-time'>Time</th>
                    </tr>
                    
            </thead>

                
                <tbody>
                    {props.applicants.map((applicant, index) => (
                    <SearchResult
                        key={index}
                        applicant={applicant}
                        notificaiton={false} /> //TODO fill this with is applicant new bool for notification to show up to connect it to back end
                ))}
                </tbody>
            </table>
        </section>
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
                    const response = await fetch(`${BASE_BACKEND_URL}/applicantdata/get-service-applicants?service=` + serviceName,
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
        <div >
            <NavBar constantUpdate={true} />,
            <title> My Applicants </title>
            <div className='flex justify-center'>
                <div className="container">
                    <div className="applicants-container-title">
                        Club Sign-ups
                    </div>
                    <div className="applicants-container">
                        <ApplicationPageDisplay
                            serviceName={serviceName}
                            applicants={applicants} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceApplicants