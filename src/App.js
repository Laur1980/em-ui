import React from "react";
import "./App.css";
import Persons from "./components/persons/persons.component";
import AddPerson from "./components/add-person/add-person.component";
import Navbar from "./components/navbar/navbar.component";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Persons} />
          <Route path="/add_person" exact component={AddPerson} />
          <Route path="/update_person/:id" exact component={AddPerson} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
