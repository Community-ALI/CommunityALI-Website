import React from "react";

function ServiceTypeSelector(props) {
  return (
    <label className="category-section">
      <input
        type="checkbox"
        checked={props.serviceTypeFilter.includes(props.serviceType)}
        onChange={props.ChangeServiceTypeFilter}
      />{" "}
      {props.title}
    </label>
  );
}

export default function ServiceTypeFilterSelector(props) {
  return (
    <div>
      {props.filterTypes.map(
        (serviceType, index) => {
          <ServiceTypeSelector
            key={index}
            serviceType={serviceType.serviceType}
            title={serviceType.title}
            serviceTypeFilter={props.serviceTypeFilter}
            ChangeServiceTypeFilter={props.ChangeServiceTypeFilter}
          />;
        }
      )}
    </div>
  );
}
