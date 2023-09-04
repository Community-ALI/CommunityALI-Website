import React, { useState, useEffect, useRef } from "react";
import CategoryFilterSelector from "./CategoryFilteringSelector";
import ServiceTypeSelector from "./ServiceTypeFilterSelector";

export default function ServiceDropdown(props) {
  const [isServiceTypeFilterVisable, setIsServiceTypeFilterVisable] =
    useState(false);
  const [isCategoryFilterVisable, setIsCategoryFilterVisable] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(
    props.categoriesFilter
  );

  const serviceTypeFilterToggle = useRef(null);
  const categoryFilterToggle = useRef(null);
  const serviceTypeFilterContent = useRef(null);
  const categoryFilterContent = useRef(null);

  const toggleServiceTypeFilterDropDown = () => {
    setIsServiceTypeFilterVisable(
      (prevIsContentVisible1) => !prevIsContentVisible1
    );
  };

  const toggleCategoriesFilterDropDown = () => {
    setIsCategoryFilterVisable(
      (prevIsContentVisible2) => !prevIsContentVisible2
    );
  };

  const handleSortByChange = (event) => {
    props.SetSortingType(event.target.value);
  };

  const changeServiceTypeFilter = (event) => {
    console.log(event.target.value);
    props.SetServiceTypeFilter(event.target.value);
  };

  const changeCategoryFilter = () => {
    console.log("here ", selectedCategories);
    let categories = selectedCategories;
    if (categories.includes("all") && categories.length > 1) {
      categories = selectedCategories.filter((cat) => cat != "all");
    } else {
      categories = ["all"];
    }
    props.SetCategoriesFilter(categories);
  };

  const handleClickOutside = (event) => {
    if (
      serviceTypeFilterToggle.current &&
      !serviceTypeFilterToggle.current.contains(event.target) &&
      serviceTypeFilterContent.current &&
      !serviceTypeFilterContent.current.contains(event.target)
    ) {
      setIsServiceTypeFilterVisable(false);
    }
    if (
      categoryFilterToggle.current &&
      !categoryFilterToggle.current.contains(event.target) &&
      categoryFilterContent.current &&
      !categoryFilterContent.current.contains(event.target)
    ) {
      changeCategoryFilter();
      setIsCategoryFilterVisable(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedCategories]);

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
            ref={serviceTypeFilterToggle}
          >
            <b>Filter Service Category</b>
            <span
              className={`arrow ${isServiceTypeFilterVisable ? "up" : "down"}`}
            ></span>
          </button>

          {isServiceTypeFilterVisable && (
            <div className="content fadeInDown" ref={serviceTypeFilterContent}>
              <form className="filter-category-container">
                <ServiceTypeSelector
                  serviceTypes={props.serviceTypes}
                  serviceTypeFilter={props.serviceTypeFilter}
                  ChangeServiceTypeFilter={changeServiceTypeFilter}
                />
              </form>
            </div>
          )}
        </div>

        <div className="filter-buttons-container">
          <button
            className="filter-school-button"
            onClick={toggleCategoriesFilterDropDown}
            ref={categoryFilterToggle}
          >
            <b>Filter By School</b>
            <span
              className={`arrow ${isCategoryFilterVisable ? "up" : "down"}`}
            ></span>
          </button>

          {isCategoryFilterVisable && (
            <div
              className="school-filter-content fadeInDown"
              ref={categoryFilterContent}
            >
              <form
                className="filter-category-container"
                onSubmit={(event) => {
                  event.preventDefault();
                  changeCategoryFilter();
                }}
              >
                <CategoryFilterSelector
                  selectedCategories={selectedCategories}
                  SetCategoriesFilter={props.SetCategoriesFilter}
                  SetSelectedCategories={setSelectedCategories}
                />
                <hr />
                <div className="flex text-white justify-between p-2 items-center mt-3">
                  <input
                    type="reset"
                    value="Clear All"
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedCategories(["all"]);
                    }}
                  ></input>
                  <input
                    type="submit"
                    className="bg-ali-orange p-1 px-2 rounded-lg text-black cursor-pointer"
                    value="Apply"
                  ></input>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      <div className="right-section">
        <div className="flex items-center">
          <label>Sort by: </label>
          <div className="cont">
            <select
              className="border-none outline-none bg-transparent text-black 
                font-bold appearance-none -webkit-appearance-none text-[18px]
                text-center px-3"
              value={props.sortingType}
              onChange={handleSortByChange}
            >
              <option value="alphabetical">Alphabetical</option>
              {/* <option value="reverse_alphabetical">Reverse Alphabetical</option> */}
              <option value="newest">Most Recent</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
