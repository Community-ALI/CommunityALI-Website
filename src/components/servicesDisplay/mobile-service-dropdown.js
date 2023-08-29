import React, { useState, useEffect, useRef } from "react";
import CategoryFilterSelector from "./CategoryFilteringSelector";
import ServiceTypeSelector from "./ServiceTypeFilterSelector";

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
    if (selectedCategories.includes("all") && selectedCategories.length > 1) {
      setSelectedCategories(selectedCategories.filter((cat) => cat != "all"));
    } else if (selectedCategories.length < 1) {
      setSelectedCategories(["all"]);
    }
    props.SetCategoriesFilter(selectedCategories);
    props.SetServiceTypeFilter(selectedServiceTypes);
    setIsServiceTypeAndCategoriesFiltersVisable(false);
  };

  const toggleServiceTypeFilterDropDown = () => {
    setIsServiceTypeAndCategoriesFiltersVisable(
      !isServiceTypeAndCategoriesFiltersVisable
    );
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
    console.log(props.showServices);
  }, [props.serviceTypeFilter, props.categoriesFilter, props.showServices]);

  if (isServiceTypeAndCategoriesFiltersVisable) {
    return (
      <div>
        <div
          className="fixed w-[100vw] z-30 bg-ali-lightblue h-[100vh] top-0
            left-0 flex flex-col mt-[66px]"
        >
          <div className="flex text-white justify-between items-center p-6">
            <button
              className="cursor-pointer text-white"
              onClick={() => {
                props.SetCategoriesFilter(["all"]);
                props.SetServiceTypeFilter(["all"]);
              }}
            >
              Clear All
            </button>
            <h1 className="font-bold text-lg absolute left-1/2 translate-x-[-50%]">
              Filter
            </h1>
            <button
              className="w-6 h-6 cursor-pointer"
              onClick={toggleServiceTypeFilterDropDown}
            >
              <i className="fa-solid fa-x text-white"></i>
            </button>
          </div>
          <hr className="border-2 text-white border-white" />
          <form
            className="flex-grow flex flex-col px-6 gap-6"
            onSubmit={(event) => {
              event.preventDefault();
              submitFilters();
            }}
          >
            <h1 className="text-white mt-12 font-bold text-lg">
              Filter Service Category
            </h1>
            <ServiceTypeSelector
              serviceTypes={props.serviceTypes}
              serviceTypeFilter={selectedServiceTypes}
              ChangeServiceTypeFilter={changeServiceTypeFilter}
            />
            <h1 className="text-white font-bold text-lg">Filter By School</h1>
            <CategoryFilterSelector
              selectedCategories={selectedCategories}
              SetCategoriesFilter={props.SetCategoriesFilter}
              SetSelectedCategories={setSelectedCategories}
            />
            <input
              type="submit"
              className="bg-ali-orange p-1 px-2 rounded-lg text-black"
              value="Apply"
            ></input>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow max-w-[100%]">
      <div className="flex justify-between items-center max-w-[100%] lr:mx-6">
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
              <b>Sort By</b>
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
                <div className="flex justify-between">
                  <label className="sort-label text-5xl font-bold text-white">
                    Sort by:{" "}
                  </label>
                  <button
                    className="w-6 h-6 cursor-pointer"
                    onClick={toggleServiceTypeFilterDropDown}
                  >
                    <i className="fa-solid fa-x text-white"></i>
                  </button>
                </div>
                <form
                  className="flex-grow flex-col flex gap-3"
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
                        className="category-section border-2 border-white rounded-lg p-2 text-white"
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
                    className="bg-ali-orange p-1 px-2 rounded-lg text-black"
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
