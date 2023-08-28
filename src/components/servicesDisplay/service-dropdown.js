import React, { useState, useEffect, useRef } from "react";
import CategoryFilterSelector from "./CategoryFilteringSelector";

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
            props.SetServiceTypeFilter
          );
        }}
      />{" "}
      {props.title}
    </label>
  );
}

export default function ServiceDropdown(props) {
  const [isContentVisible1, setServiceTypeFilterDropDownVisability] =
    useState(false);
  const [isContentVisible2, setContentVisible2] = useState(false);

  const [isCheckedVolunteer, setIsCheckedVolunteer] = useState(false);

  const [isContOpen, setContOpen] = useState(false);
  const [sortBy, setSortBy] = useState("");

  const buttonRef1 = useRef(null);
  const buttonRef2 = useRef(null);
  const contentRef1 = useRef(null);
  const contentRef2 = useRef(null);

  const toggleServiceTypeFilterDropDown = () => {
    setServiceTypeFilterDropDownVisability(
      (prevIsContentVisible1) => !prevIsContentVisible1
    );
  };

  const toggleContent2 = () => {
    setContentVisible2((prevIsContentVisible2) => !prevIsContentVisible2);
  };

  const toggleCont = () => {
    setContOpen((isContOpen) => !isContOpen);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
    props.SetSortingType(event.target.value);
    setContOpen(false);
  };

  const changeFilter = (input, filter, filterSetState) => {
    if (filter.includes(input)) {
      if (filter.length < 2) {
        filterSetState(["all"]);
        return;
      }
      console.log(`removing ${input} form ${filter}`);
      filterSetState(filter.filter((filterType) => filterType != input));
      return;
    }
    console.log("02: " + props.serviceTypeFilter);
    filterSetState(
      filter.filter((filterType) => filterType != "all").concat(input)
    );
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    console.log(props.serviceTypeFilter);
    console.log(props.categoriesFilter);
  }, [props.serviceTypeFilter, props.categoriesFilter]);

  return (
    <div className="flex justify-between w-[100%] p-[25px] items-center">
      <div className="filter-both-buttons-container">
        <div className="filter-buttons-container">
          <button
            className="add-service-button mobileFilterServiceButton"
            onClick={toggleServiceTypeFilterDropDown}
            ref={buttonRef1}
          >
            <b>Filter Service Category</b>
            <span
              className={`arrow ${isContentVisible1 ? "up" : "down"}`}
            ></span>
          </button>

          {isContentVisible1 && (
            <div className="content fadeInDown" ref={contentRef1}>
              <form className="filter-category-container">
                {[{ serviceType: "Club", title: "Clubs & Communities" }].map(
                  (serviceTypeSelector, index) => {
                    <ServiceTypeSelector
                      key={index}
                      serviceType={serviceTypeSelector.serviceType}
                      title={serviceTypeSelector.title}
                      serviceTypeFilter={props.serviceTypeFilter}
                      SetServiceTypeFilter={props.SetServiceTypeFilter}
                      ChangeFilter={changeFilter}
                    />;
                  }
                )}
                <label className="category-section">
                  <input
                    type="checkbox"
                    name="Club"
                    checked={props.serviceTypeFilter.includes("Club")}
                    onChange={() => {
                      changeFilter(
                        "Club",
                        props.serviceTypeFilter,
                        props.SetServiceTypeFilter
                      );
                    }}
                  />{" "}
                  Clubs & Communities
                </label>
                {/* <label className="category-section">
                  <input
                    type="checkbox"
                    name="Volunteer"
                    checked={isCheckedVolunteer}
                  />{" "}
                  Volunteering and Projects
                </label> */}
                <label className="category-section">
                  <input
                    type="checkbox"
                    name="Internship"
                    checked={props.serviceTypeFilter.includes("Internship")}
                    onChange={() => {
                      changeFilter(
                        "Internship",
                        props.serviceTypeFilter,
                        props.SetServiceTypeFilter
                      );
                    }}
                  />{" "}
                  Internships & Work Experience
                </label>

                <input
                  type="reset"
                  className="filter-reset"
                  value="Clear All"
                  onClick={() => {
                    props.SetServiceTypeFilter(["all"]);
                  }}
                ></input>
              </form>
            </div>
          )}
        </div>

        <div className="filter-buttons-container">
          <button className="filter-school-button" onClick={toggleContent2}>
            <b>Filter By School</b>
            <span
              className={`arrow ${isContentVisible2 ? "up" : "down"}`}
            ></span>
          </button>

          {isContentVisible2 && (
            <div className="school-filter-content fadeInDown" ref={contentRef2}>
              <form className="filter-category-container">
                <CategoryFilterSelector
                  categoriesFilter={props.categoriesFilter}
                  SetCategoriesFilter={props.SetCategoriesFilter}
                  ChangeFilter={changeFilter}
                />
              </form>
            </div>
          )}
        </div>
      </div>

      <div className="right-section">
        <div className="sort-by">
          <label className="sort-label">Sort by: </label>
          <div className="cont">
            <select
              className="sort-select"
              value={props.sortingType}
              onChange={handleSortByChange}
            >
              <option value="alphabetical">Alphabetical</option>
              <option value="reverse_alphabetical">Reverse Alphabetical</option>
              <option value="newest">Most Recent</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
