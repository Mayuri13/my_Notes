import React from "react";

export default function Alerts(props) {
  const capitalize = (word) => {
    if (word === "danger") word = "error";
    let neww = word.toLowerCase();
    neww = neww.charAt(0).toUpperCase() + neww.slice(1);
    return neww;
  };
  return (
    <div style={{ height: "50 px" }}>
      {/*The below 'props.alert &&' is written so that when a null is passed in the props it doesnot show error*/}
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{capitalize(props.alert.type)}</strong> {props.alert.msg}
          {/* Add alert dismiss button here if required */}
        </div>
      )}
    </div>
  );
}
