import React, { Component } from "react";
import Person from "../person/person.component";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import "./persons.css";
import axios from "axios";

class Persons extends Component {
  constructor(props) {
    super(props);
    this.state = { serverError: false, loading: true };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  componentDidMount() {
    axios
      .get("/persons")
      .then((response) => {
        console.log("Persons response: ", response);
        this.props.onGetPersons(response.data);
        this.props.onUpdateBudget(this.props.persons);
      })
      .catch((error) => {
        console.log("Persons error: ", error);
        this.setState({
          ...this.state,
          serverError: true,
        });
      })
      .finally(() => {
        this.setState({
          ...this.state,
          loading: false,
        });
      });
  }

  handleDelete = (id) => {
    if (!id) {
      return;
    }
    axios
      .delete(`/persons/${id}`)
      .then((response) => {
        if (response.data) {
          const persons = JSON.parse(JSON.stringify(this.props.persons));
          let index;
          persons.find((p, ind) => {
            index = ind;
            return p.id === id;
          });
          persons.splice(index, 1);
          this.props.onGetPersons(persons);
          this.props.onUpdateBudget(persons);
        }
      })
      .catch((error) => {
        console.log("Person delete error: ", error);
        this.setState({
          ...this.state,
          serverError: true,
        });
      })
      .finally(() => {
        this.setState({
          ...this.state,
          loading: false,
        });
      });
  };

  handleUpdate = (id) => {
    if (!id) {
      return;
    }
  };

  render() {
    return !this.props.persons || this.props.persons.lenth === 0 ? (
      <h1>There are no persons added!</h1>
    ) : (
      <div className="persons-container">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.persons.map((person, index) => (
              <Person
                key={person.id}
                no={index + 1}
                person={person}
                onDelete={this.handleDelete}
                onUpdate={this.handleUpdate}
              />
            ))}
            <tr>
              <td colSpan="7" className="last-row">
                Total salary budget: {this.props.budget}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStoreToProps = (state) => {
  return {
    budget: state.budgetState.budget,
    persons: state.personsState.persons,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetPersons: (persons) =>
      dispatch({ type: actionTypes.GET_PERSONS, persons: persons }),
    onUpdateBudget: (persons) =>
      dispatch({ type: actionTypes.UPDATE_TOTAL_BUDGET, persons: persons }),
    onAddPerson: (person) =>
      dispatch({ type: actionTypes.ADD_PERSON, value: person }),
    onRemovePerson: (id) =>
      dispatch({ type: actionTypes.REMOVE_PERSON, value: id }),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(Persons);
