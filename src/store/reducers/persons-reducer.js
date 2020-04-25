import * as actionTypes from "../../store/actions";

const initialState = {
  persons: [
    {
      id: 1,
      firstName: "Marian",
      lastName: "Marinescu",
      age: 32,
      salary: 3400,
    },
    {
      id: 2,
      firstName: "Gorilian",
      lastName: "Gorilescu",
      age: 26,
      salary: 2200,
    },
    {
      id: 3,
      firstName: "Mihaela",
      lastName: "Mihailescu",
      age: 38,
      salary: 4500,
    },
    {
      id: 4,
      firstName: "Sorina",
      lastName: "Sorinescu",
      age: 34,
      salary: 2700,
    },
  ],
};

const setPersons = (state, persons) => {
  return {
    persons: persons,
  };
};

const addPerson = (state, person) => {
  const persons = state.persons.slice();
  person.id = persons.length + 1;
  persons.push(person);
  return {
    persons: persons,
  };
};

const removePerson = (state, id) => {
  const persons = state.persons.slice();
  let ind;
  persons.find((e, index) => {
    ind = index;
    return e.id === id;
  });
  persons.splice(ind, 1);
  return {
    persons: persons,
  };
};

const personsReducer = (state = initialState, action) => {
  const type = action.type;
  switch (type) {
    case actionTypes.REMOVE_PERSON:
      return removePerson(state, action.id);
    case actionTypes.ADD_PERSON:
      return addPerson(state, action.person);
    case actionTypes.GET_PERSONS:
      return setPersons(state, action.persons);
    default:
      return state;
  }
};

export default personsReducer;
