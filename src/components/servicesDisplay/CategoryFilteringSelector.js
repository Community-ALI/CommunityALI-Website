import React, { useState } from "react";

function CategorySelector(props) {
  function HandleCategoryChange() {
    if (props.selectedCategories.includes(props.category)) {
      props.SetSelectedCategories(
        props.selectedCategories.filter(
          (category) => category != props.category
        )
      );
      return;
    }
    props.SetSelectedCategories([...props.selectedCategories, props.category]);
  }

  return (
    <label className="category-section">
      <input
        type="checkbox"
        checked={props.selectedCategories.includes(props.category)}
        onChange={() => {
          HandleCategoryChange();
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
          selectedCategories={props.selectedCategories}
          SetCategoriesFilter={props.SetCategoriesFilter}
          SetSelectedCategories={props.SetSelectedCategories}
        />
      ))}
    </div>
  );
}
