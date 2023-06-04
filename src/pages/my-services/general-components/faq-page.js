import React, { useState } from "react";
import '../add-service.css';

function FaqPage({ formData, setFormData }) {
  const maxFaqLength = 10;
  const [faqData, setFaqData] = useState(formData.faq || [{ faqQuestion: "", faqAnswer: "" }]);
  const [FAQVisible, setFAQVisible] = useState(true);

  const updateFormData = (updatedFaqData) => {
    setFaqData(updatedFaqData);
    setFormData((prevData) => ({ ...prevData, faq: updatedFaqData }));
  };

  const faqAdd = () => {
    if (faqData.length >= maxFaqLength - 1) {
      setFAQVisible(false);
    }
    const updatedFaqData = [...faqData, { faqQuestion: "", faqAnswer: "" }];
    updateFormData(updatedFaqData);
  };

  const faqDelete = (k) => {
    setFAQVisible(true);
    const updatedFaqData = [...faqData];
    updatedFaqData.splice(k, 1);
    updateFormData(updatedFaqData);
  };

  const faqChange = (p, k) => {
    const { name, value } = p.target;
    const updatedFaqData = [...faqData];
    updatedFaqData[k][name] = value;
    updateFormData(updatedFaqData);
  };

  return (
    <div className="faq">
      <div id="faq-container">
        <div className="service-header" id="faq-title">
          Frequently Asked Questions
        </div>
        {faqData.map((faqVal, k) => (
          <div className="contacts-container" key={k}>
            <input
              type="text"
              placeholder="Insert Question Here"
              className="contacts-text-box"
              name="faqQuestion"
              value={faqVal.faqQuestion}
              onChange={(p) => faqChange(p, k)}
              id="question-text-box"
            /><br />
            <div className="text-button-container">
              <input
                type="url"
                placeholder="Insert Answer to the Question Above"
                className="contacts-email-box"
                name="faqAnswer"
                value={faqVal.faqAnswer}
                onChange={(p) => faqChange(p, k)}
                id="answer-text-box"
              /><br />
              <button type="button" className="delete-button" onClick={() => faqDelete(k)}>
                Delete
              </button>
            </div>
          </div>
        ))}
        {FAQVisible && (
          <div className="add-button-container">
            <button type="button" className="add-button" onClick={faqAdd}>
              Add another FAQ
            </button>
          </div>
        )}
        {/* <p> {JSON.stringify(faqData)} </p> */}
      </div>
    </div>
  );
}

export default FaqPage;
