import React, { useRef, Component, useState, useEffect } from "react";
import './add-club.css';

function ContactsPage() {

    const maxContactCount = 5;
    const maxMediaCount = 5;
    const [contactData, setContactData] = useState([{contactRole:"", contactName:"", contactEmail:""}])
    const [mediaData, setMediaData] = useState([{mediaType:"", mediaName:"", mediaUrl:""}])
    const[socialMediaVisible, setSocialMediaVisible] = useState(true);
    const[contactVisible, setContactVisible] = useState(true);

    const contactAdd=()=>{
      if (contactData.length>=maxContactCount-1){
        setContactVisible(false);
      };
      setContactData([...contactData,{contactRole:"", contactName:"", contactEmail:""}])
    }
  
    const mediaAdd=()=>{
      if (mediaData.length >=maxMediaCount-1){
        setSocialMediaVisible(false)
      }
      setMediaData([...mediaData,{mediaType:"", mediaName:"", mediaUrl:""}])
    }
    
    const contactDelete=(j)=>{
      setContactVisible(true);
      const deleteContactVal = [...contactData]
      deleteContactVal.splice(j,1)
      setContactData(deleteContactVal)
    }
  
    const mediaDelete=(i)=>{
      setSocialMediaVisible(true);
      const deleteMediaVal = [...mediaData]
      deleteMediaVal.splice(i,1)
      setMediaData(deleteMediaVal)
    }
    
    const contactChange=(h,j)=>{
      const {name, value} = h.target
      const onchangeContactVal = [...contactData]
      onchangeContactVal[j][name] = value
      setContactData(onchangeContactVal)
    }
  
    const mediaChange=(e,i)=>{
      const {name, value} = e.target
      const onChangeMediaVal = [...mediaData]
      onChangeMediaVal[i][name] = value
      setMediaData(onChangeMediaVal)
    }

    return(
        <div>
            <div className="service-info2-container">
                <div className="service-details" id="contact-container">
                    <div className="service-author"></div>
                    <div className="service-header">Contact Us</div>

                {
                    contactData.map((contactVal,j)=>
                    <div className="contacts-container">
                    <select className="club-contacts-selection" name="contactRole" id='contact-role-1' 
                    value={contactVal.contactRole} onChange={(h)=> contactChange(h,j)}>
                        <option value="" selected> Select Officer</option>
                        <option value="president">President</option>
                        <option value="vice-president">Vice President</option>
                        <option value="icc-rep">ICC Rep</option>
                        <option value="advisor">Advisor</option>
                    </select>
                    <input type="text" placeholder="Full Name of Officer" className="contacts-text-box" name="contactName" 
                    value={contactVal.contactName} onChange={(h)=> contactChange(h,j)} id='contact-name-1'  /><br />
                    <div className="text-button-container">
                        <input type="email" placeholder="School or Personal Email of Officer" className="contacts-email-box" name="contactEmail" 
                        value={contactVal.contactEmail} onChange={(h)=> contactChange(h,j)} id='contact-email-1' /><br />
                        <button type="button" className="delete-button" onClick={()=>contactDelete(j)}>Delete</button>   
                    </div>
                    </div>
                    )
                }
                {contactVisible &&
                <div className="add-button-container">
                    <button type="button" className="add-button" onClick={contactAdd}>Add another Contact</button>
                </div>
                }
                {/* <p> {JSON.stringify(contactData)} </p>  */}
                </div>

                <div className="service-details" id="contact-container">
                    <div className="service-author"></div>
                    <div className="service-header">Follow our Social Media</div>
                
                {
                    mediaData.map((mediaVal,i)=>
                    <div className="contacts-container">
                    <select className="club-contacts-selection" name="mediaType" 
                    value={mediaVal.mediaType} onChange={(e)=> mediaChange(e,i)} id='contact-role-1'>
                        <option value="" selected> Select Media</option>
                        <option value="zoom">Zoom</option>
                        <option value="discord">Discord</option>
                        <option value="instagram">Instagram</option>
                        <option value="facebook">Facebook</option>
                    </select>
                    <input type="text" placeholder="Club Account Name" className="contacts-text-box" name="mediaName" 
                    value={mediaVal.mediaName} onChange={(e)=> mediaChange(e,i)} id='contact-name-4' /><br />
                    <div className="text-button-container">
                        <input type="url" placeholder="Insert link to the Club Account" className="contacts-email-box" name="mediaUrl" 
                        value={mediaVal.mediaUrl} onChange={(e)=> mediaChange(e,i)} id='contact-email-1' /><br />
                        <button type="button" className="delete-button" onClick={()=>mediaDelete(i)}>Delete</button>    
                    </div>
                    </div>
                    )
                }
                    {socialMediaVisible && 
                    <div className="add-button-container">
                    <button type="button" className="add-button" onClick={mediaAdd}>Add another Social Media</button>
                    </div>
                    }
                
                {/* <p> {JSON.stringify(mediaData)} </p>  */}
                </div>
            </div>
        </div>
    )
}

export default ContactsPage;