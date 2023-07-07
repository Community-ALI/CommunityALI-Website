import React, { useState } from 'react';

const ServiceDropdown = () => {
  const [isContentVisible, setContentVisible] = useState(false);
  const [isButtonCollapsed, setButtonCollapsed] = useState(true);

  const [isButton6Collapsed, setButton6Collapsed] = useState(false);
  const [isButton7Collapsed, setButton7Collapsed] = useState(false);
  const [isButton8Collapsed, setButton8Collapsed] = useState(false);
  const [isButton9Collapsed, setButton9Collapsed] = useState(false);

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);

  const [isContOpen, setContOpen] = useState(false);
  const [sortBy, setSortBy] = useState('');



  const toggleButton6 = () => {
    setButton6Collapsed(!isButton6Collapsed);
    setIsChecked1(!isChecked1);
  };

  const toggleButton7 = () => {
    setButton7Collapsed(!isButton7Collapsed);
    setIsChecked2(!isChecked2);
  };

  const toggleButton8 = () => {
    setButton8Collapsed(!isButton8Collapsed);
    setIsChecked3(!isChecked3);
  };

  const toggleButton9 = () => {
    setButton9Collapsed(!isButton9Collapsed);
    setIsChecked4(!isChecked4);
  };


  const toggleCont = () => {
    setContOpen(isContOpen => !isContOpen);
  };

  const toggleContent = () => {
    setContentVisible(!isContentVisible);
  };

  const toggleButton = () => {
    setButtonCollapsed(!isButtonCollapsed);
  };


  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
    setContOpen(false);
  };

  const handleCheckboxChange = (category, checkbox) => {
    setCheckboxes(prevCheckboxes => ({
      ...prevCheckboxes,
      [category]: {
        ...prevCheckboxes[category],
        [checkbox]: !prevCheckboxes[category][checkbox]
      }
    }));
  };

  const [checkboxes, setCheckboxes] = useState({
    subjectAndCareerOriented: {
      agriculture: false,
      art: false,
      behavioral: false,
      business: false,
      fitness: false,
      industry: false,
      language: false,
      public: false,
      science: false,
    }
  });

  return (
    <>
      <div className="dropdown-container">
        <button className="add-service-button" onClick={toggleContent}>
          <b>Add a Service Category</b><span className={`arrow ${isContentVisible ? 'up' : 'down'}`}></span>
        </button>

        {isContentVisible && (
          <div className="content" onClick={handleContentClick}>
            <button className="collapsible-button" onClick={toggleButton}>
              <span className={`arrow ${isButtonCollapsed ? 'down' : 'up'}`}></span>Subject & Career Oriented
            </button>
            {!isButtonCollapsed && (
              <div className="details">

                <label>
                  <input type="checkbox"
                    checked={checkboxes.subjectAndCareerOriented.agriculture}
                    onChange={() => handleCheckboxChange('subjectAndCareerOriented', 'agriculture')} /> Agriculture
                </label>
                <label>
                  <input type="checkbox"
                    checked={checkboxes.subjectAndCareerOriented.art} //add the checked attribute here 
                    onChange={() => handleCheckboxChange('subjectAndCareerOriented', 'art')} /> Art, Performances & Humanities
                </label>
                <label>
                  <input type="checkbox"
                    checked={checkboxes.subjectAndCareerOriented.behavioral} //add the checked attribute here
                    onChange={() => handleCheckboxChange('subjectAndCareerOriented', 'behavioral')} /> Behavioral & Social Sciences
                </label>
                <label>
                  <input type="checkbox"
                    checked={checkboxes.subjectAndCareerOriented.business} //add the checked attribute here
                    onChange={() => handleCheckboxChange('subjectAndCareerOriented', 'business')} /> Business & Computing
                </label>
                <label>
                  <input type="checkbox"
                    checked={checkboxes.subjectAndCareerOriented.fitness} //add the checked attribute here
                    onChange={() => handleCheckboxChange('subjectAndCareerOriented', 'fitness')} /> Fitness & Health Professions
                </label>
                <label>
                  <input type="checkbox"
                    checked={checkboxes.subjectAndCareerOriented.industry} //add the checked attribute here
                    onChange={() => handleCheckboxChange('subjectAndCareerOriented', 'industry')} /> Industry & Trades
                </label>
                <label>
                  <input type="checkbox"
                    checked={checkboxes.subjectAndCareerOriented.language} //add the checked attribute here
                    onChange={() => handleCheckboxChange('subjectAndCareerOriented', 'language')} /> Language Arts & Education
                </label>
                <label>
                  <input type="checkbox"
                    checked={checkboxes.subjectAndCareerOriented.public} //add the checked attribute here
                    onChange={() => handleCheckboxChange('subjectAndCareerOriented', 'public')} /> Public Safety
                </label>
                <label>
                  <input type="checkbox"
                    checked={checkboxes.subjectAndCareerOriented.science} //add the checked attribute here
                    onChange={() => handleCheckboxChange('subjectAndCareerOriented', 'science')} /> Science, Engineering & Mathematics
                </label>
              </div>

            )}

            <div className="button-with-checkbox">
              <input type="checkbox" id="cb1" checked={isChecked1} style={{ marginRight: '10px' }} />
              <label htmlFor="cb1">
                <button className='collapsible-button' onClick={toggleButton6}>Clubs & Communities</button>
              </label>
            </div>

            <div className="button-with-checkbox">
              <input type="checkbox" id="cb2" checked={isChecked2} style={{ marginRight: '10px' }} />
              <label htmlFor="cb2">
                <button className="collapsible-button" onClick={toggleButton7}>Volunteering & Community Service</button>
              </label>
            </div>

            <div className="button-with-checkbox">
              <input type="checkbox" id="cb3" checked={isChecked3} style={{ marginRight: '10px' }} />
              <label htmlFor="cb3">
                <button className='collapsible-button' onClick={toggleButton8}>Internships & Work Experience</button>
              </label>
            </div>

            <div className="button-with-checkbox">
              <input type="checkbox" id="cb4" checked={isChecked4} style={{ marginRight: '10px' }} />
              <label htmlFor="cb4">
                <button className='collapsible-button' onClick={toggleButton9}>Events & Other</button>
              </label>
            </div>

          </div>

        )}
        <div className="right-section">
          <div className="sort-by">
            <label className='sort-label'>Sort by: </label>
            <div className="cont">
              <select className='sort-select' value={sortBy} onChange={handleSortByChange} onMouseDown={toggleCont}>
                <option value="recent">Most Recent</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
              <span className={`arrow ${isContOpen ? 'up' : 'down'}`} ></span>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDropdown;