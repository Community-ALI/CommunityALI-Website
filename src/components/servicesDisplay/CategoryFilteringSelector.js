import React from "react";

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
            props.SetCategoriesFilter
          );
        }}
      />{" "}
      {props.category}
    </label>
  );
}

export default function CategoryFilterSelector(props) {
  return (
    <div>
      {[
        "Agriculture",
        "Art, Performance, & the Humanities ",
        "Behavioral & Social Sciences",
        "Business & Computing",
        "Fitness & Health Professions",
        "Industry & Trades",
        "Language Arts & Education",
        "Public Safety",
        "Science, Engineering, & Mathematics",
      ].map((category, index) => (
        <CategorySelector
          key={index}
          category={category}
          categoriesFilter={props.categoriesFilter}
          SetCategoriesFilter={props.SetCategoriesFilter}
          ChangeFilter={props.ChangeFilter}
        />
      ))}
      <hr />
      <div className="flex text-white justify-between p-2 items-center">
        <input
          type="reset"
          value="Clear All"
          onClick={() => {
            props.SetCategoriesFilter(["all"]);
          }}
        ></input>
        <input
          type="submit"
          className="bg-ali-orange p-1 px-2 rounded-lg text-black"
          value="Apply"
        ></input>
      </div>
    </div>
  );
}
