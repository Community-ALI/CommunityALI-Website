//react modules
import React, { useEffect, useState } from 'react';
import { BASE_BACKEND_URL } from '../../config.js'
import '../../../public/stylesheets/style.css'
import NavBar from '../../components/NavBar';
import Notifications from '../../components/Notification';
import { Buffer } from 'buffer';
import { set } from 'mongoose';




// turn an ISO date string into a date string
function getTime(isoDate) {
    const date = new Date(isoDate);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    // create a string in the format HH:MM AM/PM (ex. 12:00 AM)
    const time = `${hours % 12}:${minutes.toString().padStart(2, '0')} ${(hours < 12) ? 'AM' : 'PM'}`;
    if (time == 'NaN:NaN PM' || time == 'NaN:NaN AM') {
        return 'Long Ago';
    }
    return time;
}


// turn an ISO date string into a date string
function getDate(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const lastTwoDigitsOfYear = year.toString().slice(-2);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    // create a string in the format MM/DD/YY
    const dateString = `${month}/${day}/${lastTwoDigitsOfYear}`;
    if (dateString == 'NaN/NaN/aN') {
        return 'Long Ago';
    };
    return dateString;
}


// each individual application to display
const ApplicantDisplay = function (props) {
    console.log('displaying applicant');
    const applicant = props.applicant;
    const isNotification = applicant.is_new_applicant;
    // get date and time from the ISO date string
    const ApplicationTime = getTime(applicant.isoDate);
    const ApplicationDate = getDate(applicant.isoDate);
    // turn applicant.miniProfileImage into an image url if it exists
    var miniProfileImageURL = 'photos-optimized/user-pic.png';
    if (applicant.miniProfileImage) {
        const miniProfileImage = applicant.miniProfileImage;
        const miniProfileImageBase64 = Buffer.from(miniProfileImage).toString('base64');
        miniProfileImageURL = `data:image/png;base64,${miniProfileImageBase64}`;
    };
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
    }, []);


    // accept applicant and add their account to service members
    const acceptApplicant = async () => {
        const token = localStorage.getItem('token');
        if (token){


            // get the service name from the url
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const serviceName = urlParams.get('service');
            console.log({username: applicant.user})
            // send a fetch request to add the new member to the service
            const response = await fetch(`${BASE_BACKEND_URL}/servicedata/add-member?service=` + serviceName, {
                method: 'POST',
                body: JSON.stringify({username: applicant.user}),
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'content-type': 'application/json'
                },
               
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.success){
                    alert('Applicant accepted');
                    // remove the applicant from the list of applicants
                    props.removeApplicantLocally(props.applicant);
                }
                else{
                    alert(data.error);
                }
            })
            .catch(error => {
                console.log(error);
                alert('Error accepting applicant');
            });


        }
    }


    // reject applicant and remove their application
    const rejectApplicant = async (applicant) => {
        const token = localStorage.getItem('token');
        if (token){
            // get the service name from the url
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const serviceName = urlParams.get('service');
            console.log({username: applicant.user})
            fetch(`${BASE_BACKEND_URL}/applicantdata/delete-application`, {
                method: 'POST',
                body: JSON.stringify({username: applicant.user, service: serviceName}),
                headers: {
                    authorization: `Bearer ${token}`,
                    'content-type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.success){
                    alert('Applicant rejected');
                    // remove the applicant from the list of applicants
                    props.removeApplicantLocally(props.applicant);
                }
                else{
                    alert(data.error);
                }
            })
        

       }
    }


    const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);


    return (
        <div className='blue-container relative flex flex-col items-center'>
            <Notifications styleLeft={false} isRedDot={true} notifications={(isNotification) ? 1 : 0} />
            <div className='flex items-center justify-center flex-wrap w-[100%] md:flex-nowrap'>
                <img src={miniProfileImageURL} className='w-[60px] py-[10px] px-[5px] sm:w-[50px] ' style={{ borderRadius: '50%' }}/>
                <div className='w-[100%] flex flex-col text-center justify-center items-center px-[10px] xsm:pt-[10px] md:items-start'>
                    <h3 className='text-[#ecaa1e] text-[18px] md:text-[16px] sm:text-[14px]'>{applicant.name}</h3>
                    <div className='text-[13px] overflow-x-hidden lr:text-[12px]'>
                        <p className='overflow-hidden w-[100%] overflow-ellipsis xsm:text-[11px]'>{applicant.email}</p>
                    </div>
                </div>
                <div className='flex w-[100%] text-[12px] font-semibold gap-3 justify-center items-center sm:text-[70%] xsm:text-[60%] py-[10px] px-[10px] md:justify-end md:absolute md:top-0'>
                    <p>{`Date: ${ApplicationDate}`}</p>
                    <p className='md:hidden'>{`Time: ${ApplicationTime}`}</p>
                </div>
                <div className={`flex text-[13px] px-[5px] py-[5px] mt-[10px] relative md:hidden`}>
                    <button onClick={() => acceptApplicant(applicant)} className={`text-[#23F638] dark-blue-container-with-border px-[15px] py-[5px] ${(isMobile) ? "w=[100%]" : "w-[50%]"}`}>ACCEPT</button>
                    <button onClick={() => rejectApplicant(applicant)} className={`text-[#FE2F2F] dark-blue-container-with-border px-[15px] py-[5px] ${(isMobile) ? "w=[100%]" : "w-[50%]"}`}>REJECT</button>
                </div>
            </div>
            {(applicant.phoneNumber || isMobile) &&
            <div className='flex flex-col items-center pt-[10px]'>
                
                <div className='flex items-center cursor-pointer' onClick={() => setShowAdditionalDetails(!showAdditionalDetails)}>
                    <p className='text-[14px] md:text-[13px] sm:text-[12px]'>More details</p>
                    <span className={`arrow ${showAdditionalDetails ? 'up' : 'down'}`}></span>
                </div>


                
                <div className={`transition-max-height overflow-hidden ease-in-out duration-500 ${showAdditionalDetails ? 'max-h-[200px]' : 'max-h-0'}`}>
                    <h1 className='mt-[20px] mb-[10px]'>Additional Information</h1>
                    {applicant.phoneNumber && 
                    <div className='text-[13px] mb-[20px]'>
                        <p>
                        Phone Number: {applicant.phoneNumber}
                        </p>
                    </div>
                    }
                    <div className={`flex gap-2 w-[100%] text-[80%] px-[5px] mb-[10px] relative lrr:hidden`}>
                        <button onClick={() => acceptApplicant(applicant)} className={`text-[#23F638] dark-blue-container-with-border px-[15px] py-[5px] ${(isMobile) ? "w=[100%]" : "w-[50%]"}`}>ACCEPT</button>
                        <button onClick={() => rejectApplicant(applicant)} className={`text-[#FE2F2F] dark-blue-container-with-border px-[15px] py-[5px] ${(isMobile) ? "w=[100%]" : "w-[50%]"}`}>REJECT</button>
                    </div>
                </div>
                
            </div>
            }   
        </div>
    );
};




// create the information required to display the page
function ApplicationPageDisplay(props) {
    // Remove applicants with no isoDate and store them in a new array
    const applicantsWithNoDate = []
    const applicants = props.applicants.filter((applicant) => {
        if (applicant.isoDate) {
            return true;
        }
        else {
            applicantsWithNoDate.push(applicant);
            return false;
        }
    });
    // sort applicants by date
    var sortedApplicants = applicants.sort((a, b) => {
        const dateA = new Date(a.isoDate);
        const dateB = new Date(b.isoDate);
        return  dateB - dateA;
    });
    // add applicants with no date to the end of the array
    sortedApplicants.push(...applicantsWithNoDate);


   
    // if there are no applicants, display a message
    if (sortedApplicants.length === 0) {
        return (
            <div className='flex flex-col items-center'>
                <h1 className='text-[28px] text-white mt-[40px] mb-[20px]'>No Applicants</h1>
                <p className='text-[18px] text-white text-center mb-[40px]'>There are no applicants for this service.</p>
            </div>
        );
    }

    return (
        <div className='grid grid-cols-4 auto-cols-auto gap-6 justify-center items-start xxlr:grid-cols-3 lr:grid-cols-2 md:grid-cols-1'>
            {sortedApplicants.map((applicant, index) => (
                <ApplicantDisplay
                    key={index}
                    applicant={applicant}
                    removeApplicantLocally={props.removeApplicantLocally}
                    />
            ))}
        </div>
    );
}


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

                        const loaderWrapper = document.querySelector(".loader-wrapper");
                        loaderWrapper.style.transition = "opacity 0.5s";
                        loaderWrapper.style.opacity = "0";
                        setTimeout(() => {
                            loaderWrapper.style.display = "none";
                        }, 500); // fade out duration in milliseconds
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


    const removeApplicantLocally = (applicant) => {
        // remove the applicant from the list of applicants
        const newApplicants = applicants.filter((applicant2) => applicant2 != applicant);
        setApplicants(newApplicants);
    }


    const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);
    useState(() => {
        console.log(window.innerWidth);
        window.addEventListener('resize', (() => {
            setIsMobile(window.innerWidth <= 850)
        }));
    })

    const redirectToMemberManagement = () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const serviceName = urlParams.get('service');
        window.location.href = '/member-management?service=' + serviceName;
    }


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
                                <button onClick={redirectToMemberManagement} className='blue-container w-[112.766px]'>Members</button>
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
                                applicants={applicants}
                                removeApplicantLocally={removeApplicantLocally}
                                />
                        </div>
                    </div>
                </div>
                <div className="loader-wrapper">
                    <span className="loader"><span className="loader-inner"></span></span>
                </div>
            </div>
        </>
    )
}


export default ServiceApplicants
