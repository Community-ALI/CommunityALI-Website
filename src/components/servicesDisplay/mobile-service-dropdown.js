import React, { useState, useEffect, useRef } from "react";
import CategoryFilterSelector from "./CategoryFilteringSelector";
import ServiceTypeSelector from "./ServiceTypeFilterSelector";
import { set } from "mongoose";

const ServiceDropdown = (props) => {
  const [
    isServiceTypeAndCategoriesFiltersVisable,
    setIsServiceTypeAndCategoriesFiltersVisable,
  ] = useState(false);
  const [isSortingFilterVisable, setIsSortingFilterVisable] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState(
    props.categoriesFilter
  );
  const [selectedServiceTypes, setSelectedServiceTypes] = useState(
    props.serviceTypeFilter
  );
  const [selectedSortingType, setSelectedSortingType] = useState(
    props.sortingType
  );

  const changeServiceTypeFilter = (event) => {
    setSelectedServiceTypes(event.target.value);
  };

  const submitFilters = () => {
    let categories = selectedCategories;
    if (categories.includes("all") && categories.length > 1) {
      categories = selectedCategories.filter((cat) => cat != "all");
    } else if (categories.length === 0) {
      categories = ["all"];
    }
    props.SetCategoriesFilter(categories);
    props.SetServiceTypeFilter(selectedServiceTypes);
    setIsServiceTypeAndCategoriesFiltersVisable(false);
  };

  const toggleServiceTypeFilterDropDown = () => {
    setIsServiceTypeAndCategoriesFiltersVisable(
      !isServiceTypeAndCategoriesFiltersVisable
    );
    setSelectedCategories(props.categoriesFilter);
    setSelectedServiceTypes(props.serviceTypeFilter);
  };

  const toggleCont = () => {
    setContOpen((isContOpen) => !isContOpen);
  };

  const handleSortByChange = (event) => {
    props.SetSortingType(event.target.value);
    setContOpen(false);
  };

  useEffect(() => {
    console.log(props.serviceTypeFilter);
    console.log(props.categoriesFilter);
  }, [props.serviceTypeFilter, props.categoriesFilter]);

  if (isServiceTypeAndCategoriesFiltersVisable) {
    return (
      <div
        className="fixed w-[100vw] z-30 bg-ali-lightblue h-[100%] top-0
            left-0 flex flex-col pt-[66px] overflow-y-scroll pb-8"
      >
        <div className="flex text-white justify-between items-center p-6">
          <button
            className="cursor-pointer text-white"
            onClick={() => {
              setSelectedCategories(["all"]);
              setSelectedServiceTypes(["all"]);
            }}
          >
            Clear All
          </button>
          {/* <h1 className="font-bold text-lg absolute left-1/2 translate-x-[-50%]">
            Filter
          </h1> */}
          <button
            className="w-6 h-6 cursor-pointer"
            onClick={toggleServiceTypeFilterDropDown}
          >
            <i className="fa-solid fa-x text-white"></i>
          </button>
        </div>
        <hr className="border-1 text-white border-white" />
        <form
          className="flex-grow flex flex-col px-6 gap-6"
          onSubmit={(event) => {
            event.preventDefault();
            submitFilters();
          }}
        >
          <h1 className="text-white mt-12 font-[500] text-lg">
            Filter Service Category
          </h1>
          <ServiceTypeSelector
            serviceTypes={props.serviceTypes}
            serviceTypeFilter={selectedServiceTypes}
            ChangeServiceTypeFilter={changeServiceTypeFilter}
          />
          <h1 className="text-white font-[500] text-lg mt-6">Filter By School</h1>
          <CategoryFilterSelector
            selectedCategories={selectedCategories}
            SetCategoriesFilter={props.SetCategoriesFilter}
            SetSelectedCategories={setSelectedCategories}
          />
          <input
            type="submit"
            className="bg-ali-orange p-1 px-2 rounded-lg text-ali-darkblue font-[500] mt-4"
            value="Apply"
          ></input>
        </form>
      </div>
    );
  }

  return (
    <div className="flex-grow max-w-[100%]">
      <div className="flex justify-start items-center max-w-[100%] mb-5 sm:justify-around">
        {!isSortingFilterVisable && (
          <div className="filter-buttons-container">
            <button
              className="add-service-button"
              onClick={toggleServiceTypeFilterDropDown}
            >
              <b>Filter</b>
              <span
                className={`arrow ${isSortingFilterVisable ? "up" : "down"}`}
              ></span>
            </button>
          </div>
        )}

        <div className="filter-buttons-container">
          {!isSortingFilterVisable && (
            <button
              className="filter-school-button"
              onClick={() => {
                setIsSortingFilterVisable(!isSortingFilterVisable);
              }}
            >
              <b className="whitespace-nowrap">Sort By</b>
              <span
                className={`arrow ${isSortingFilterVisable ? "up" : "down"}`}
              ></span>
            </button>
          )}

          {isSortingFilterVisable && (
            <div
              className="fixed w-[100vw] z-30 bg-ali-lightblue h-[100vh] top-0
              left-0 flex flex-col mt-[66px]"
            >
              <div className="flex flex-col gap-3 p-6">
                <div className="flex justify-between items-end">
                  <label className="sort-label text-5xl font-bold text-white">
                    Sort by:{" "}
                  </label>
                  <button
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => {
                      setIsSortingFilterVisable(false);
                      setSelectedSortingType(props.sortingType);
                    }}
                  >
                    <i className="fa-solid fa-x text-white"></i>
                  </button>
                </div>
                <form
                  className="flex-grow flex-col flex gap-6 mt-6"
                  onSubmit={(event) => {
                    event.preventDefault();
                    props.SetSortingType(selectedSortingType);
                    setIsSortingFilterVisable(false);
                  }}
                >
                  {props.sortingTypes.map((sortType) => {
                    return (
                      <label
                        key={sortType.value}
                        className="category-section border-[1.5px] border-white rounded-lg px-4 py-2 text-white"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSortingType === sortType.value}
                          onChange={() => {
                            setSelectedSortingType(sortType.value);
                          }}
                        />{" "}
                        {sortType.title}
                      </label>
                    );
                  })}
                  <input
                    type="submit"
                    className="bg-ali-orange p-1 px-2 rounded-lg text-ali-darkblue font-[500] mt-4"
                    value="Apply"
                  ></input>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDropdown;
