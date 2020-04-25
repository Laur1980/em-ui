import "./add-person.css";
import React, { useState } from "react";
import * as inputTypes from "../inputs/input-types.js";
import TextInput from "../inputs/text-input.component";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export const ADD_PERSON_CONFIG = {
  lastName: {
    type: inputTypes.TEXT,
    value: "",
    id: "lname",
    label: "Last name",
    placeholder: "Last name...",
    errors: {
      valid: {
        value: true,
        message: "This field is valid!",
      },
    },
    touched: false,
  },
  firstName: {
    type: inputTypes.TEXT,
    value: "",
    id: "fname",
    label: "First name",
    placeholder: "First name...",
    errors: {
      valid: {
        value: true,
        message: "The field value is invalid!",
      },
    },
    touched: false,
  },
  age: {
    type: inputTypes.NUBER,
    value: "",
    id: "age",
    label: "Age",
    placeholder: "age...",
    errors: {
      valid: {
        value: true,
        message: "The field value is invalid!",
      },
    },
    touched: false,
  },
  salary: {
    type: inputTypes.NUBER,
    value: "",
    id: "salary",
    label: "Salary",
    placeholder: "Salary...",
    errors: {
      valid: {
        value: true,
        message: "The field value is invalid!",
      },
    },
    touched: false,
  },
  isSubmitEnabled: false,
  redirect: false,
};

/**
 * AddPerson function component that is used for create and update operations for PersonDocument objects
 * The component is associated with '/add_person' and '/update_person/:id' paths
 * @param {*} props
 */
const AddPerson = (props) => {
  const [state, setState] = useState(ADD_PERSON_CONFIG);

  const isAgeValidFn = (age) => {
    if (!age || isNaN(age)) {
      return false;
    }
    return age >= 18 && age <= 65;
  };

  const isSalaryValidFn = (salary) => {
    if (!salary || isNaN(salary)) {
      return false;
    }
    return salary > 0;
  };

  const isNameValidFn = (name) => {
    if (!name || name.toString().trim() === "") {
      return false;
    }
    return name.length >= 3;
  };

  const checkEnabled = (copyState) => {
    if (!copyState) {
      return false;
    }
    const isLastNameValid = !copyState.lastName.errors.valid.value;
    const isFirstNameValid = !copyState.firstName.errors.valid.value;
    const age = copyState.age.value;
    const isAgeValid = isAgeValidFn(age);
    const salary = copyState.salary.value;
    const isSalaryValid = isSalaryValidFn(salary);
    return isFirstNameValid && isLastNameValid && isAgeValid && isSalaryValid;
  };

  useEffect(() => {
    if (props.match.params.id && props.match.params.id !== "add_person") {
      axios
        .get(`persons/${props.match.params.id}`)
        .then((response) => {
          if (response.data) {
            const copyState = JSON.parse(JSON.stringify(state));
            const person = response.data;
            copyState.firstName.value = person.firstName;
            copyState.firstName.errors.valid.value = false;
            copyState.lastName.value = person.lastName;
            copyState.lastName.errors.valid.value = false;
            copyState.age.value = person.age;
            copyState.age.errors.valid.value = false;
            copyState.salary.value = person.salary;
            copyState.salary.errors.valid.value = false;
            copyState.isSubmitEnabled = checkEnabled(copyState);
            setState(copyState);
          }
        })
        .catch((error) => console.log(console.error));
    } else {
      //switch from update_person/:id to add_person
      if (
        state.firstName.value &&
        state.firstName.value.toString().trim() !== ""
      ) {
        setState(ADD_PERSON_CONFIG);
      }
    }
  }, [props.match.params.id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const copyState = JSON.parse(JSON.stringify(state));
    if (
      state.lastName.errors.valid.value ||
      state.firstName.errors.valid.value ||
      state.age.errors.valid.value ||
      state.salary.errors.valid.value
    ) {
      copyState.isSubmitEnabled = false;
      setState(copyState);
      return;
    }
    const person = {
      firstName: state.firstName.value,
      lastName: state.lastName.value,
      age: state.age.value,
      salary: state.salary.value,
    };
    if (!props.match.params.id) {
      axios.post("/persons", person).then((response) => {
        if (response.data) {
          copyState.isSubmitEnabled = true;
          copyState.redirect = true;

          setState(copyState);
          console.log("Post person:", person);
        }
      });
    } else {
      person.id = props.match.params.id;
      axios.put("/persons", person).then((response) => {
        if (response.data) {
          copyState.isSubmitEnabled = true;
          copyState.redirect = true;

          setState(copyState);
          console.log("Post person:", person);
        }
      });
    }
    console.log("Submit state: ", state);
  };

  const handleValueChange = (value, objName) => {
    if (!objName || value === state[objName].value) {
      return;
    }
    //deep copy of current state
    const copyState = JSON.parse(JSON.stringify(state));
    copyState[objName].value = value;
    copyState[objName].touched = true;
    const isPartialValid = value && value.toString().trim() !== "";
    if (isPartialValid) {
      copyState.isSubmitEnabled = checkEnabled(copyState);
      switch (objName) {
        case "age":
          copyState[objName].errors.valid.value = !isAgeValidFn(value);
          break;
        case "salary":
          copyState[objName].errors.valid.value = !isSalaryValidFn(value);
          break;
        default:
          copyState[objName].errors.valid.value = !isNameValidFn(value);
      }
    } else {
      copyState[objName].errors.valid.value = true;
      copyState.isSubmitEnabled = false;
    }
    setState(copyState);
  };

  const handleInvalidText = (objName) => {
    if (!state || !objName) {
      return null;
    }
    const isNotValid =
      state[objName].errors.valid.value && state[objName].touched;
    const message = state[objName].errors.valid.message;
    if (!isNotValid) {
      return null;
    }

    return <p className="error">{message}</p>;
  };

  return state.redirect ? (
    <Redirect to="/" />
  ) : (
    <div className="add-person-container">
      <form onSubmit={handleSubmit}>
        <TextInput
          type={state.firstName.type}
          placeholder={state.firstName.placeholder}
          id={state.firstName.id}
          label={state.firstName.label}
          value={state.firstName.value}
          onValueChange={(value) => handleValueChange(value, "firstName")}
        />
        {handleInvalidText("firstName")}
        <TextInput
          type={state.lastName.type}
          placeholder={state.lastName.placeholder}
          id={state.lastName.id}
          label={state.lastName.label}
          value={state.lastName.value}
          onValueChange={(value) => handleValueChange(value, "lastName")}
        />
        {handleInvalidText("lastName")}
        <TextInput
          type={state.age.type}
          placeholder={state.age.placeholder}
          id={state.age.id}
          label={state.age.label}
          value={state.age.value}
          onValueChange={(value) => handleValueChange(value, "age")}
        />
        {handleInvalidText("age")}
        <TextInput
          type={state.salary.type}
          placeholder={state.salary.placeholder}
          id={state.salary.id}
          label={state.salary.label}
          value={state.salary.value}
          onValueChange={(value) => handleValueChange(value, "salary")}
        />
        {handleInvalidText("salary")}
        <input disabled={!state.isSubmitEnabled} type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddPerson;
