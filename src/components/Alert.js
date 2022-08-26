import React from "react";
import Alert from "react-bootstrap/Alert";

const AppAlert = (props) => {
  //const capitalize = (word) => {
  //  let lower = word.toLowerCase();
  //  return lower.charAt(0).toUpperCase() + word.slice(1);
  //};

  return (
    <div style={{ height: "50px" }}>
      {props.alert && (
        <Alert key={props.alert?.type} variant={props.alert?.type}>
          {props.alert?.msg}
        </Alert>
      )}
    </div>
  );
};

export default AppAlert;
