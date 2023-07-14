import React, { useState, useEffect, useRef } from 'react';

function SchoolSelector(props) {
  return (
    <label className="category-section">
      <input
        type="checkbox"
        name={props.school}
        checked={false}
      /> {props.school}
    </label>
  )
}

const ServiceDropdown = (props) => {

  const [isContentVisible1, setServiceTypeFilterDropDownVisability] = useState(false);
  const [isContentVisible2, setContentVisible2] = useState(false);

  const [isButtonCollapsed1, setButtonCollapsed1] = useState(true);
  const [isButtonCollapsed2, setButtonCollapsed2] = useState(true);

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

  <label className="category-section">
    <input
      type="checkbox"
      name="Agriculture"
      checked={isCheckedAgriculture}
    /> Agriculture
  </label>
  const [isContOpen, setContOpen] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const buttonRef1 = useRef(null);
  const buttonRef2 = useRef(null);
  const contentRef1 = useRef(null);
  const contentRef2 = useRef(null);

  const toggleServiceTypeFilterDropDown = () => {
    setServiceTypeFilterDropDownVisability((prevIsContentVisible1) => !prevIsContentVisible1);
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

  const changeServiceTypeFilter = (input) => {
    if (props.serviceTypeFilter.includes(input)) {
      if (props.serviceTypeFilter.length > 2) {
        props.SetServiceTypeFilter(['all']);
        return;
      }
      console.log(`removing ${input} form ${props.serviceTypeFilter}`)
      props.SetServiceTypeFilter(
        props.serviceTypeFilter.filter((filterType) => filterType != input));
      return;
    }
    console.log("02: " + props.serviceTypeFilter)
    props.SetServiceTypeFilter(
      ...(props.serviceTypeFilter.filter((filterType) => filterType != 'all')), input);
  };

  useEffect(() => {
    console.log(props.serviceTypeFilter)
  }, []);

  return (
    <>
      <div className="filter-system-container">
        <div className='filter-both-buttons-container'>
          <div className='filter-buttons-container'>
            <button className="add-service-button" onClick={toggleServiceTypeFilterDropDown}>
              <b>Filter Service Category</b><span className={`arrow ${isContentVisible1 ? 'up' : 'down'}`}></span>
            </button>

            {isContentVisible1 && (
              <div className="content fadeInDown" ref={contentRef1}>
                <form className='filter-category-container'>
                  <label className="category-section">
                    <input
                      type="checkbox"
                      name="Club"
                      checked={props.serviceTypeFilter.includes('Club')}
                      onChange={() => { changeServiceTypeFilter('Club') }}
                    /> Clubs & Communities
                  </label>
                    <label className="category-section">
                      <input
                        type="checkbox"
                        name="Science"
                        checked={isCheckedScience}
                      /> Science, Engineering & Mathematics
                    </label>
                    <label className="category-section">
                      <input
                        type="checkbox"
                        name="Volunteer"
                        checked={isCheckedVolunteer}
                      /> Volunteering and Services
                    </label>

                    <label className="category-section">
                      <input
                        type="checkbox"
                        name="Internship"
                        checked={props.serviceTypeFilter.includes('Internship')}
                        onChange={() => { changeServiceTypeFilter('Internship') }}
                      /> Internships & Work Experience
                    </label>

                    <input type="reset" className="filter-reset" value="Clear All" onClick={(() => { props.SetServiceTypeFilter(['all']) })}></input>
                </form>
              </div>
            )}
          </div>

          <div className='filter-buttons-container'>Agriculture
            <button className="filter-school-button" onClick={toggleContent2} ref={buttonRef2}>
              <b>Filter By School</b><span className={`arrow ${isContentVisible2 ? 'up' : 'down'}`}></span>
            </button>

            {isContentVisible2 && (
              <div className="school-filter-content fadeInDown" ref={contentRef2}>
                <form className='filter-category-container'>
                  {["Agriculture", "Art", "Behavioral", "Business", "Fitness",
                    "Industry", "Language", "Public", "Science"]
                    .map((school, index) => <SchoolSelector key={index} school={school} />)}

                  <input type="reset" className="filter-reset" value="Clear All" onClick={(() => {})}></input>
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