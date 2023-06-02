import React, { useRef, Component, useState, useEffect } from "react";
import './add-club.css';

function FaqPage() {

    const maxFaqLength = 10;
    const [faqData, setFaqData] = useState([{faqQuestion:"", faqAnswer:""}])
    const[FAQVisible, setFAQVisible] = useState(true);

    const faqAdd=()=>{
        if (faqData.length>=maxFaqLength-1){
          setFAQVisible(false);
        }
        setFaqData([...faqData,{faqQuestion:"", faqAnswer:""}])
      }

    const faqDelete=(k)=>{
      setFAQVisible(true);
      const deleteFaqVal = [...faqData]
      deleteFaqVal.splice(k,1)
      setFaqData(deleteFaqVal)
    }

    const faqChange=(p,k)=>{
        const {name, value} = p.target
        const onChangeFaqVal = [...faqData]
        onChangeFaqVal[k][name] = value
        setFaqData(onChangeFaqVal)
      }

    return(
        <div class="faq">
            <div id="faq-container">
                <div className="service-header" id="faq-title">Frequently Asked Questions</div>
                {
                faqData.map((faqVal,k)=>
                <div className="contacts-container">
                    <input type="text" placeholder="Insert Question Here" className="contacts-text-box" name="faqQuestion" 
                    value={faqVal.faqQuestion} onChange={(p)=> faqChange(p,k)} id="question-text-box" /><br />
                    <div className="text-button-container">
                    <input type="url" placeholder="Insert Answer to the Question Above" className="contacts-email-box" name="faqAnswer" 
                    value={faqVal.faqAnswer} onChange={(p)=> faqChange(p,k)} id="answer-text-box" /><br />
                    <button type="button" className="delete-button" onClick={()=>faqDelete(k)}>Delete</button>    
                    </div>
                </div>
                )
                }
                { FAQVisible &&
                <div className="add-button-container">
                <button type="button" className="add-button" onClick={faqAdd}>Add another FAQ</button>
                </div>
                }
                {/* <p> {JSON.stringify(faqData)} </p>  */}
            </div>
        </div>
    )
}

export default FaqPage;