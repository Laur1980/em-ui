import React from "react";
import "./text-input.css";

const TextInput = (props) => {
  const handleOnChange = (event) => {
    const value = event.target.value;
    props.onValueChange(value);
  };

  const inputLabel = () => {
    if (!props.label) {
      return null;
    }
    return (
      <React.Fragment>
        <label htmlFor={props.id}>{props.label}</label>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <p>
        {inputLabel()}
        <input
          type={props.type}
          id={props.id}
          value={props.value}
          autoComplete={"off"}
          placeholder={props.placeholder}
          onChange={handleOnChange}
          onKeyUp={handleOnChange}
        />
      </p>
    </React.Fragment>
  );
};

export default TextInput;
