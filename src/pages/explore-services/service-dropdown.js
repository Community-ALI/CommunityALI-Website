import React, { useState, useEffect, useRef } from 'react';

function CategorySelector(props) {
  return (
    <label className="category-section">
      <input
        type="checkbox"
        checked={props.categoriesFilter.includes(props.category)}
        onChange={() => { props.ChangeFilter(props.category, props.categoriesFilter, props.SetCategoriesFilter) }}
      /> {props.category}
    </label>
  )
}

function ServiceTypeSelector(props) {
  return (
    <label className="category-section">
      <input
        type="checkbox"
        checked={props.serviceTypeFilter.includes(props.serviceType)}
        onChange={() => { props.ChangeFilter(props.serviceType, props.serviceTypeFilter, props.SetServiceTypeFilter) }}
      /> {props.title}
    </label>
  )
}

const ServiceDropdown = (props) => {

  const [isContentVisible1, setServiceTypeFilterDropDownVisability] = useState(false);
  const [isContentVisible2, setContentVisible2] = useState(false);

  const [isButtonCollapsed1, setButtonCollapsed1] = useState(true);
  const [isButtonCollapsed2, setButtonCollapsed2] = useState(true);

  const [isCheckedVolunteer, setIsCheckedVolunteer] = useState(false);

  const [isCheckedScience, setIsCheckedScience] = useState(false);

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

  const changeFilter = (input, filter, filterSetState) => {
    if (filter.includes(input)) {
      if (filter.length < 2) {
        filterSetState(['all']);
        return;
      }
      console.log(`removing ${input} form ${filter}`)
      filterSetState(
        filter.filter((filterType) => filterType != input));
      return;
    }
    console.log("02: " + props.serviceTypeFilter)
    filterSetState(
      (filter.filter((filterType) => filterType != 'all')).concat(input));
  };

  useEffect(() => {
    console.log(props.serviceTypeFilter)
    console.log(props.categoriesFilter)
  }, [props.serviceTypeFilter, props.categoriesFilter]);

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
                  {[{ serviceType: 'Club', title: 'Clubs & Communities' }]
                    .map((serviceTypeSelector, index) => {
                      <ServiceTypeSelector
                        key={index}
                        serviceType={serviceTypeSelector.serviceType}
                        title={serviceTypeSelector.title}
                        serviceTypeFilter={props.serviceTypeFilter}
                        SetServiceTypeFilter={props.SetServiceTypeFilter}
                        ChangeFilter={changeFilter}
                      />
                    })}
                  <label className="category-section">
                    <input
                      type="checkbox"
                      name="Club"
                      checked={props.serviceTypeFilter.includes('Club')}
                      onChange={() => { changeFilter('Club', props.serviceTypeFilter, props.SetServiceTypeFilter) }}
                    /> Clubs & Communities
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
                      onChange={() => { changeFilter('Internship', props.serviceTypeFilter, props.SetServiceTypeFilter) }}
                    /> Internships & Work Experience
                  </label>

                  <input type="reset" className="filter-reset" value="Clear All" onClick={(() => { props.SetServiceTypeFilter(['all']) })}></input>
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
                  {["Agriculture", "Art", "Behavioral", "Business", "Fitness",
                    "Industry", "Language", "Public", "Science"]
                    .map((category, index) => <CategorySelector key={index}
                      category={category}
                      categoriesFilter={props.categoriesFilter}
                      SetCategoriesFilter={props.SetCategoriesFilter}
                      ChangeFilter={changeFilter} />)}
                  <input type="reset" className="filter-reset" value="Clear All" onClick={(() => { props.SetCategoriesFilter(['all']) })}></input>
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