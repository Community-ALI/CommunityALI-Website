import React, { useState, useEffect, useRef } from "react";
import CategoryFilterSelector from "./CategoryFilteringSelector";

export default function ServiceDropdown(props) {
  const [isContentVisible1, setServiceTypeFilterDropDownVisability] =
    useState(false);
  const [isContentVisible2, setContentVisible2] = useState(false);

  const buttonRef1 = useRef(null);

  const toggleServiceTypeFilterDropDown = () => {
    setServiceTypeFilterDropDownVisability(
      (prevIsContentVisible1) => !prevIsContentVisible1
    );
  };

  const toggleContent2 = () => {
    setContentVisible2((prevIsContentVisible2) => !prevIsContentVisible2);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
    props.SetSortingType(event.target.value);
    setContOpen(false);
  };

  const [serviceTypeFilter, setServiceTypeFilter] = useState(
    props.serviceTypeFilter
  );

  const changeServiceTypeFilter = (event) => {
    setServiceTypeFilter(event.target.value);
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
                <ServiceTypeSelector
                  serviceTypes={props.serviceTypes}
                  serviceTypeFilter={serviceTypeFilter}
                  ChangeServiceTypeFilter={changeServiceTypeFilter}
                />
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
