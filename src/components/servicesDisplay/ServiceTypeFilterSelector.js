import React from "react";

function ServiceTypeSelector(props) {

  return (
    <label className="category-section">
      <input
        type="checkbox"
        value={props.serviceType}
        checked={props.serviceTypeFilter.includes(props.serviceType)}
        onChange={props.ChangeServiceTypeFilter}
      />{" "}
      {props.title}
    </label>
  );
}

export default function ServiceTypeFilterSelector(props) {
  console.log(props.serviceTypeFilter);
  return (
    <div>
      {props.serviceTypes.map((serviceType, index) => {
        return (
          <ServiceTypeSelector
            key={index}
            serviceType={serviceType.serviceType}
            title={serviceType.title}
            serviceTypeFilter={props.serviceTypeFilter}
            ChangeServiceTypeFilter={props.ChangeServiceTypeFilter}
          />
        );
      })}
    </div>
  );
}
