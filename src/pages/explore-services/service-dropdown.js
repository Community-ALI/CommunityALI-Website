import React, { useState, useEffect, useRef } from 'react';

const ServiceDropdown = (props) => {

  const [isContentVisible1, setContentVisible1] = useState(false);
  const [isContentVisible2, setContentVisible2] = useState(false);

  const [isButtonCollapsed1, setButtonCollapsed1] = useState(true);
  const [isButtonCollapsed2, setButtonCollapsed2] = useState(true);

  const [isCheckedClub, setIsCheckedClub] = useState(false);
  const [isCheckedVolunteer, setIsCheckedVolunteer] = useState(false);
  const [isCheckedInternship, setIsCheckedInternship] = useState(false);

  const [isCheckedAgriculture, setIsCheckedAgriculture] = useState(false);
  const [isCheckedArt, setIsCheckedArt] = useState(false);
  const [isCheckedBehavioral, setIsCheckedBehavioral] = useState(false);
  const [isCheckedBusiness, setIsCheckedBusiness] = useState(false);
  const [isCheckedFitness, setIsCheckedFitness] = useState(false);
  const [isCheckedIndustry, setIsCheckedIndustry] = useState(false);
  const [isCheckedLanguage, setIsCheckedLanguage] = useState(false);
  const [isCheckedPublic, setIsCheckedPublic] = useState(false);
  const [isCheckedScience, setIsCheckedScience] = useState(false);

  const [isContOpen, setContOpen] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const buttonRef1 = useRef(null);
  const buttonRef2 = useRef(null);
  const contentRef1 = useRef(null);
  const contentRef2 = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (buttonRef1.current &&
          !buttonRef1.current.contains(event.target) &&
          contentRef1.current &&
          !contentRef1.current.contains(event.target)) ||
        (buttonRef2.current &&
          !buttonRef2.current.contains(event.target) &&
          contentRef2.current &&
          !contentRef2.current.contains(event.target))
      ) {
        setContentVisible1(false);
        setContentVisible2(false);
        setButtonCollapsed1(true);
        setButtonCollapsed2(true);
        }
      };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

 
  useEffect(() => {
    setIsCheckedClub(props.filterType.includes('Club'));
    setIsCheckedVolunteer(props.filterType.includes('Volunteer'));
    setIsCheckedInternship(props.filterType.includes('Internship'));
    setIsCheckedAgriculture(props.filterType.includes('Agriculture'));
    setIsCheckedArt(props.filterType.includes('Art'));
    setIsCheckedBehavioral(props.filterType.includes('Behavioral'));
    setIsCheckedBusiness(props.filterType.includes('Business'));
    setIsCheckedFitness(props.filterType.includes('Fitness'));
    setIsCheckedIndustry(props.filterType.includes('Industry'));
    setIsCheckedLanguage(props.filterType.includes('Language'));
    setIsCheckedPublic(props.filterType.includes('Public'));
    setIsCheckedScience(props.filterType.includes('Science'));

  }, [props.filterType]);


  const toggleContent1 = () => {
    setContentVisible1((prevIsContentVisible1) => !prevIsContentVisible1);
    setButtonCollapsed1(true);
  };

  const toggleContent2 = () => {
    setContentVisible2((prevIsContentVisible2) => !prevIsContentVisible2);
    setButtonCollapsed2(true);
  };

  const toggleCont = () => {
    setContOpen(isContOpen => !isContOpen);
  };

  const handleSortByChange = (event) => {
    props.SetSortingType(event.target.value);
    setContOpen(false);
  };

  const changeFilter = (input) => {
    let updatedFilterType;
    if (props.filterType.includes(input)) {
      updatedFilterType = props.filterType.filter((filterType) => filterType !== input);
    } else {
      updatedFilterType = [...props.filterType, input];
    }
    props.SetFilterType(updatedFilterType);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    switch (name) {
      case 'Club':
        setIsCheckedClub(checked);
        break;
      case 'Volunteer':
        setIsCheckedVolunteer(checked);
        break;
      case 'Internship':
        setIsCheckedInternship(checked);
        break;
      case 'Agriculture':
        setIsCheckedAgriculture(checked);
        break;
      case 'Art':
        setIsCheckedArt(checked);
        break;
      case 'Behavioral':
        setIsCheckedBehavioral(checked);
        break;
      case 'Business':
        setIsCheckedBusiness(checked);
        break;
      case 'Fitness':
        setIsCheckedFitness(checked);
        break;
      case 'Industry':
        setIsCheckedIndustry(checked);
        break;
      case 'Language':
        setIsCheckedLanguage(checked);
        break;
      case 'Public':
        setIsCheckedPublic(checked);
        break;
      case 'Science':
        setIsCheckedScience(checked);
        break;
      default:
        break;
    }
  };

  const handleReset1 = () => {
    props.SetFilterType([]);
    setIsCheckedClub(false);
    setIsCheckedVolunteer(false);
    setIsCheckedInternship(false);

    // Close the category content menu
    // setContentVisible(false);
    // setButtonCollapsed(true);
  };

  const handleReset2 = () => {
    props.SetFilterType([]);
    setIsCheckedAgriculture(false);
    setIsCheckedArt(false);
    setIsCheckedBehavioral(false);
    setIsCheckedBusiness(false);
    setIsCheckedFitness(false);
    setIsCheckedIndustry(false);
    setIsCheckedLanguage(false);
    setIsCheckedPublic(false);
    setIsCheckedScience(false);

    // Close the category content menu
    // setContentVisible(false);
    // setButtonCollapsed(true);
  };

  return (
    <>
      <div className="filter-system-container">
        <div className='filter-both-buttons-container'>
        <div className='filter-buttons-container'>
        <button className="add-service-button" onClick={toggleContent1} ref={buttonRef1}>
          <b>Filter Service Category</b><span className={`arrow ${isContentVisible1 ? 'up' : 'down'}`}></span>
        </button>

        {isContentVisible1 && (
          <div className="content fadeInDown" ref={contentRef1}>
            <form className='filter-category-container'>
              <label className= "category-section">
                <input
                    type="checkbox"
                    name="Club"
                    checked={isCheckedClub}
                    onChange={handleCheckboxChange}
                  /> Clubs & Communities
              </label>

              <label className= "category-section">
                <input
                    type="checkbox"
                    name="Volunteer"
                    checked={isCheckedVolunteer}
                    onChange={handleCheckboxChange}
                /> Volunteering and Services
              </label>

              <label className= "category-section">
                <input
                    type="checkbox"
                    name="Internship"
                    checked={isCheckedInternship}
                    onChange={handleCheckboxChange}
                  /> Internships & Work Experience
              </label>

              <input type="reset" className="filter-reset" value="Clear All" onClick={handleReset1}></input>
            </form>
          </div>
        )}
        </div>

        <div className='filter-buttons-container'>
        <button className="filter-school-button" onClick={toggleContent2} ref={buttonRef2}>
          <b>Filter By School</b><span className={`arrow ${isContentVisible2 ? 'up' : 'down'}`}></span>
        </button>

        {isContentVisible2 && (
          <div className="school-filter-content fadeInDown" ref={contentRef2}>
            <form className='filter-category-container'>         
              <label className= "category-section">
                <input
                  type="checkbox"
                  name="Agriculture"
                  checked={isCheckedAgriculture}
                  onChange={handleCheckboxChange}
                  /> Agriculture
              </label>

              <label className= "category-section">
                <input
                  type="checkbox"
                  name="Art"
                  checked={isCheckedArt}
                  onChange={handleCheckboxChange}
                  /> Art, Performances & Humanities
              </label>

              <label className= "category-section">
                <input 
                  type="checkbox"
                  name="Behavioral"
                  checked={isCheckedBehavioral}
                  onChange={handleCheckboxChange}
                  /> Behavioral & Social Sciences
              </label>

              <label className= "category-section">
                <input 
                  type="checkbox"
                  name="Business"
                  checked={isCheckedBusiness}
                  onChange={handleCheckboxChange}
                  /> Business & Computing
              </label>

              <label className= "category-section">
                <input 
                  type="checkbox"
                  name="Fitness"
                  checked={isCheckedFitness}
                  onChange={handleCheckboxChange}
                  /> Fitness & Health Professions
              </label>

              <label className= "category-section">
                <input 
                  type="checkbox"
                  name="Industry"
                  checked={isCheckedIndustry}
                  onChange={handleCheckboxChange}
                  /> Industry & Trades
              </label>

              <label className= "category-section">
                <input 
                  type="checkbox"
                  name="Language"
                  checked={isCheckedLanguage}
                  onChange={handleCheckboxChange} 
                  /> Language Arts & Education
              </label>

              <label className= "category-section">
                <input 
                  type="checkbox"
                  name="Public"
                  checked={isCheckedPublic}
                  onChange={handleCheckboxChange}
                  /> Public Safety
              </label>

              <label className= "category-section">
                <input 
                  type="checkbox"
                  name="Science"
                  checked={isCheckedScience}
                  onChange={handleCheckboxChange}
                  /> Science, Engineering & Mathematics
              </label> 

              <input type="reset" className="filter-reset" value="Clear All" onClick={handleReset2}></input>
            </form>
          </div>
        )}
        </div>
        </div>

        <div className="right-section">
          <div className="sort-by">
            <label className='sort-label'>Sort by: </label>
            <div className="cont">
              <select className='sort-select' value={sortBy}>
                <option value="alphabetical">Alphabetical</option>
                <option value="recent">Most Recent</option> 
              </select>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDropdown;