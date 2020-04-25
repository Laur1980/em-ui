import React, { useState } from "react";
import "../persons/persons.css";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Redirect } from "react-router";

const Person = (props) => {
  const [updateState, setState] = useState({
    update: false,
  });

  const handleDelete = () => {
    props.onDelete(props.person.id);
  };

  const handleUpdate = () => {
    setState({ update: true });
  };

  return updateState.update ? (
    <Redirect to={`/update_person/${props.person.id}`} />
  ) : (
    <React.Fragment>
      <tr>
        <td>{props.no}</td>
        <td>{props.person.id}</td>
        <td>{props.person.firstName}</td>
        <td>{props.person.lastName}</td>
        <td>{props.person.age}</td>
        <td>{props.person.salary}</td>
        <td>
          <button onClick={handleDelete}>
            <DeleteIcon />
          </button>
          {/* <span className="actions-button"></span> */}
          <button onClick={handleUpdate}>
            <EditIcon />
          </button>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default Person;
