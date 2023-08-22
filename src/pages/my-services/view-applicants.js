//react modules
import React, { useEffect, useState } from 'react';
import { BASE_BACKEND_URL } from '../../config.js'
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

    const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);

    return (
        <div className='blue-container relative flex flex-col items-center'>
            <Notifications styleLeft={false} isRedDot={true} notifications={(isNotification) ? 1 : 0} />
            <div className='flex items-center justify-center flex-wrap w-[100%] md:flex-nowrap'>
                <img src="Photos/UserTemplateImage.png" className='w-[60px] py-[10px] px-[5px] sm:w-[50px]' />
                <div className='w-[100%] flex flex-col text-center justify-center items-center px-[10px] xsm:pt-[10px] md:items-start'>
                    <h3 className='text-[#ecaa1e] text-[18px] md:text-[16px] sm:text-[14px]'>{applicant.name}</h3>
                    <div className='text-[13px] overflow-x-hidden lr:text-[12px]'>
                        <p className='overflow-hidden w-[100%] overflow-ellipsis xsm:text-[11px]'>{applicant.email}</p>
                    </div>
                </div>
                <div className='flex w-[100%] text-[12px] font-semibold gap-3 justify-center items-center sm:text-[70%] xsm:text-[60%] py-[10px] px-[10px] md:justify-end md:absolute md:top-0'>
                    <p>{`Date: ${applicant.date}`}</p>
                    <p className='md:hidden'>{`Time: ${normalTime}`}</p>
                </div>
                <div className={`flex text-[13px] px-[5px] py-[5px] mt-[10px] relative md:hidden`}>
                    <button className={`text-[#23F638] dark-blue-container-with-border px-[15px] py-[5px] ${(isMobile) ? "w=[100%]" : "w-[50%]"}`}>ACCEPT</button>
                    <button className={`text-[#FE2F2F] dark-blue-container-with-border px-[15px] py-[5px] ${(isMobile) ? "w=[100%]" : "w-[50%]"}`}>REJECT</button>
                </div>
            </div>
            <div className='flex flex-col items-center pt-[10px]'>
                <div className='flex items-center cursor-pointer' onClick={() => setShowAdditionalDetails(!showAdditionalDetails)}>
                    <p className='text-[14px] md:text-[13px] sm:text-[12px]'>More details</p>
                    <span className={`arrow ${showAdditionalDetails ? 'up' : 'down'}`}></span>
                </div>

               
                <div className={`transition-max-height overflow-hidden ease-in-out duration-500 ${showAdditionalDetails ? 'max-h-[200px]' : 'max-h-0'}`}>
                    <h1 className='mt-[20px] mb-[10px]'>Additional Information</h1>
                    <div className='text-[13px] mb-[20px]'>
                        <p>
                        Phone Number: 209-690-6969
                        </p>
                    </div>
                    <div className={`flex gap-2 w-[100%] text-[80%] px-[5px] mb-[10px] relative lrr:hidden`}>
                        <button className={`text-[#23F638] dark-blue-container-with-border px-[15px] py-[5px] ${(isMobile) ? "w=[100%]" : "w-[50%]"}`}>ACCEPT</button>
                        <button className={`text-[#FE2F2F] dark-blue-container-with-border px-[15px] py-[5px] ${(isMobile) ? "w=[100%]" : "w-[50%]"}`}>REJECT</button>
                    </div>
                </div>
                
            </div>
        </div>
    );
};


// create the information required to display the page
function ApplicationPageDisplay(props) {
    const serviceName = props.serviceName;

    return (
        <div className='grid grid-cols-4 auto-cols-auto gap-6 justify-center items-start xxlr:grid-cols-3 lr:grid-cols-2 md:grid-cols-1'>
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
            <div className='flex justify-center mb-[60px]'>
                <div className={'max-w-[1600px] w-[90%] flex flex-col px-[25px] lr:mt-[120px] sm:px-[10px] xsm:w-[95%]' + ((!isMobile) ? ' mt-4' : ' mt-16')}>
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
                        <div className='md:w-[100%]'>
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