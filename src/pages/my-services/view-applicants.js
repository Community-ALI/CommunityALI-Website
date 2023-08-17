//react modules
import React, { useEffect, useState } from 'react';
import { BASE_BACKEND_URL } from '../../config.js'
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

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);
    useState(() => {
        console.log(window.innerWidth);
        window.addEventListener('resize', (() => {
            setIsMobile(window.innerWidth <= 850)
        }));
    })

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
                    console.log(error);
                    // Handle the error
                });
        }
        
    }, [])

    return (
        <div className='blue-container text-[95%] w-[100%] max-w-[600px] relative flex items-center'>
            <Notifications styleLeft={false} isRedDot={true} notifications={(isNotification) ? 1 : 0} />
            <div className='flex items-center justify-center w-[100%]'>
                <img src="Photos/UserTemplateImage.png" className='w-[10%] h-[10%] py-[10px] px-[5px]' />
                <div className='w-[100%] flex flex-col text-center justify-center px-[10px]'>
                    <h3 className={`text-[#ecaa1e] ${(isMobile) ? "text-[85%]" : "text-[100%]"}`}>{applicant.name}</h3>
                    <div className='text-[12px]'>
                        <p>{applicant.email}</p>
                    </div>
                </div>
                <div className='flex flex-col w-[100%] text-[80%] font-semibold gap-2'>
                    <p>{`Date: ${applicant.date}`}</p>
                    <p>{`Time: ${normalTime}`}</p>
                </div>
                {/* <div className={`flex gap-2 justify-between w-[100%] text-[80%] px-[5px] relative ${(isMobile) ? "flex-col" : ""}`}>
                    <button className={`text-[#23F638] dark-blue-container-with-border p-2 ${(isMobile) ? "w=[100%]" : "w-[50%]"}`}>ACCEPT</button>
                    <button className={`text-[#FE2F2F] dark-blue-container-with-border p-2 ${(isMobile) ? "w=[100%]" : "w-[50%]"}`}>REJECT</button>

                </div> */}
            </div>
        </div>
    );
};


// create the information required to display the page
function ApplicationPageDisplay(props) {
    const serviceName = props.serviceName;

    return (
        <div className='flex-row flex flex-wrap gap-6 justify-center'>
            {props.applicants.map((applicant, index) => (
                <SearchResult
                    key={index}
                    applicant={applicant} />
            ))}
        </div>
    );
};

function ServiceApplicants() {
    const [applicants, setApplicants] = useState([]);

    useEffect(() => 
    {
      document.title = 'Service Applicants | Community ALI';
    }, []);

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

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);
    useState(() => {
        console.log(window.innerWidth);
        window.addEventListener('resize', (() => {
            setIsMobile(window.innerWidth <= 850)
        }));
    })

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const serviceName = urlParams.get('service');
    return (
        <>
            <NavBar />
            <div className='flex justify-center'>
                <div className={'max-w-[1600px] w-[90%] flex flex-col px-[25px] lr:mt-[120px]' + ((!isMobile) ? ' mt-4' : ' mt-16')}>
                    <div className='flex flex-col gap-3'>
                        <div className="flex flex-row justify-between gap-3">
                            <button className='blue-container' onClick={() => {window.location.href = '/my-services'}}>&lt;&lt; BACK</button>
                            <div className='flex gap-3'>
                                <button className='blue-container w-[112.766px]'>Members</button>
                                {/* <button
                                className='w-10 h-10 bg-[#00468D] text-white rounded-[50%] p-2'>
                                ?</button> */}
                            </div>
                        </div>
                        {/* <div className="flex justify-end gap-3">
                            <button className='blue-container'>Quick Select</button>
                            <button className='blue-container'>Members &gt;&gt;</button>
                        </div> */}
                    </div>
                    <div className='flex flex-col items-center'>
                        <div className='w-[100%] mb-5'>
                            <div className="text-white font-medium text-[28px] ml-8 mb-[10px] mt-[40px] lr:text-[22px] 
                            sm:text-[18px] md:text-center md:ml-0">Club Sign-ups</div>
                            <hr className="border-[1.5px]"/>
                        </div>
                        <div>
                            <ApplicationPageDisplay
                                serviceName={serviceName}
                                applicants={applicants} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceApplicants