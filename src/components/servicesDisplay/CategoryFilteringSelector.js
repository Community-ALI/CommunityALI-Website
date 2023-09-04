import React, { useEffect, useState } from "react";

function CategorySelector(props) {
  const [isSelected, setIsSelected] = useState(
    props.selectedCategories.includes(props.category)
  );
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

  useEffect(() => {
    setIsSelected(props.selectedCategories.includes(props.category));
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
          SetCategoriesFilter={props.SetCategoriesFilter}
          SetSelectedCategories={props.SetSelectedCategories}
        />
      ))}
    </div>
  );
}
