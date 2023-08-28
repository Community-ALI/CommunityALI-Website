import React, { useState, useEffect, useRef } from 'react';

function CategorySelector(props) {
  return (
    <label className="category-section">
      <input
        type="checkbox"
        checked={props.categoriesFilter.includes(props.category)}
        onChange={() => {
          props.ChangeFilter(
            props.category,
            props.categoriesFilter,
            props.SetCategoriesFilter)
        }}
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
        onChange={() => {
          props.ChangeFilter(
            props.serviceType,
            props.serviceTypeFilter,
            props.SetServiceTypeFilter)
        }}
      /> {props.title}
    </label>
  )
}

function servicePopup(props) {

}

const ServiceDropdown = (props) => {

  const [isContentVisible1, setServiceTypeFilterDropDownVisability] = useState(false);
  const [isContentVisible2, setContentVisible2] = useState(false);

  const [isCheckedVolunteer, setIsCheckedVolunteer] = useState(false);

  const [isContOpen, setContOpen] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const buttonRef1 = useRef(null);
  const buttonRef2 = useRef(null);
  const contentRef1 = useRef(null);
  const contentRef2 = useRef(null);

  const toggleServiceTypeFilterDropDown = () => {
    setServiceTypeFilterDropDownVisability((prevIsContentVisible1) => !prevIsContentVisible1);
    // props.SetShowServices(!props.showServices);
  };

  const toggleContent2 = () => {
    setContentVisible2((prevIsContentVisible2) => !prevIsContentVisible2);
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

  const handleClickOutside = (event) => {
    if (
      buttonRef1.current &&
      !buttonRef1.current.contains(event.target) &&
      contentRef1.current &&
      !contentRef1.current.contains(event.target)
    ) {
      setServiceTypeFilterDropDownVisability(false);
    }
    if (
      buttonRef2.current &&
      !buttonRef2.current.contains(event.target) &&
      contentRef2.current &&
      !contentRef2.current.contains(event.target)
    ) {
      setContentVisible2(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    console.log(props.serviceTypeFilter)
    console.log(props.categoriesFilter)
    console.log(props.showServices)
  }, [props.serviceTypeFilter, props.categoriesFilter, props.showServices]);

  if (isContentVisible1) {
    return (
      <div>
        <div className="content fadeInDown" ref={contentRef1}>
          <div className='flex flex-row justify-between w-[100%] items-center'>
            <button className="w-6 h-6 cursor-pointer"
              onClick={toggleServiceTypeFilterDropDown}>
              <i className="fa-solid fa-x text-white"
              ></i>
            </button>
            <button className="cursor-pointer text-white" onClick={(() => {
              props.SetCategoriesFilter(['all'])
              props.SetServiceTypeFilter(['all'])
            })}>Clear All</button>
          </div>
          <h1 className='text-white mt-12'>Filter Service Category</h1>
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
              /> Volunteering and Projects
            </label>
            <label className="category-section">
              <input
                type="checkbox"
                name="Internship"
                checked={props.serviceTypeFilter.includes('Internship')}
                onChange={() => { changeFilter('Internship', props.serviceTypeFilter, props.SetServiceTypeFilter) }}
              /> Internships & Work Experience
            </label>

            <h1 className='text-white'>Filter By School</h1>
          </form>
          <form className='filter-category-container'>
            {["Agriculture", "Art, Performance, & the Humanities ", "Behavioral & Social Sciences", "Business & Computing", "Fitness & Health Professions",
              "Industry & Trades", "Language Arts & Education", "Public Safety", "Science, Engineering, & Mathematics"]
              .map((category, index) => <CategorySelector key={index}
                category={category}
                categoriesFilter={props.categoriesFilter}
                SetCategoriesFilter={props.SetCategoriesFilter}
                ChangeFilter={changeFilter} />)}
          </form>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className='flex justify-center'>
        {!isContentVisible2 &&
          <div className='filter-buttons-container'>
            <button className="add-service-button"
              onClick={toggleServiceTypeFilterDropDown}
              ref={buttonRef1} >
              <b>Filter</b><span className={`arrow ${isContentVisible1 ? 'up' : 'down'}`}></span>
            </button>
          </div>
        }

        <div className='filter-buttons-container'>
          {!isContentVisible1 &&
            <button className="filter-school-button"
              onClick={toggleContent2}
              ref={buttonRef2}>
              <b>Sort By</b><span className={`arrow ${isContentVisible2 ? 'up' : 'down'}`}></span>
            </button>
          }

          {isContentVisible2 && (
            <div className="content fadeInDown" ref={contentRef2}>
              <div className="right-section">
                <div className="sort-by">
                  <label className='sort-label'>Sort by: </label>
                  <div className="cont">
                    <label className="category-section">
                      <input
                        type="checkbox"
                        name="Internship"
                        checked={true}
                      /> Alphabetical
                    </label>

                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default ServiceDropdown;