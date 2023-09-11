import React, { useEffect, useState } from "react";

function CategorySelector(props) {
  const [isSelected, setIsSelected] = useState(false);
  function HandleCategoryChange() {
    if (props.selectedCategories.includes(props.category)) {
      props.SetSelectedCategories(
        props.selectedCategories.filter(
          (category) => category != props.category
        )
      );
      return;
    }

    if (props.selectedCategories.includes("all")) {
      props.SetSelectedCategories([props.category]);
      return;
    }

    props.SetSelectedCategories([...props.selectedCategories, props.category]);
  }

  useEffect(() => {
    setIsSelected(
      props.selectedCategories.includes(props.category) &&
        !props.selectedCategories.includes("all")
    );
  }, [props.selectedCategories]);

  return (
    <label className="category-section">
      <input
        type="checkbox"
        checked={isSelected}
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
          SetSelectedCategories={props.SetSelectedCategories}
        />
      ))}
    </div>
  );
}
