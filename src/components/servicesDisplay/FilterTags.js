import React, { useState, useEffect } from "react";

function Tag(props) {
  return (
    <button
      onClick={() => {
        props.removeTag(props.tag);
      }}
      className="text-white bg-ali-darkblue rounded-md flex gap-3 items-center p-2"
      key={props.tag}
    >
      <p>{props.tag}</p>
      <i className="fa-solid fa-x text-white"></i>
    </button>
  );
}

export default function FilterTags(props) {
  return (
    <div className="flex flex-wrap gap-3 px-[25px] w-[90%] mr-auto ml-auto">
      {!props.serviceTypeFilter.includes("all") && (
        <Tag
          tag={props.serviceTypeFilter}
          removeTag={() => {
            props.SetServiceTypeFilter("all");
          }}
        />
      )}
      {props.categoriesFilter.map((tag) => {
        if (!props.categoriesFilter.includes("all")) {
          return (
            <Tag
              key={tag}
              tag={tag}
              removeTag={() => {
                props.SetCategoriesFilter(
                  props.categoriesFilter.length == 1
                    ? ["all"]
                    : props.categoriesFilter.filter((cat) => cat != tag)
                );
              }}
            />
          );
        }
      })}
    </div>
  );
}
