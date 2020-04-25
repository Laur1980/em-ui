import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  let location = useLocation();

  const didMountRef = useRef(false);

  const [selectedState, setSelectedState] = useState({
    selected: "",
  });

  const removeClassSelectedFromAll = () => {
    const allLiElems = document.querySelectorAll(
      "div.navbar-container > ul > li > a"
    );
    if (allLiElems && allLiElems.length !== 0) {
      allLiElems.forEach((e) => {
        e.classList.remove("selected");
        if (e.parentNode) {
          e.parentNode.classList.remove("selected");
        }
      });
    }
  };

  const setPath = (path) => {
    if (!path) {
      return;
    }
    let id;
    switch (path) {
      case "/":
        id = "home";
        setSelectedState({ selected: "Home" });
        break;
      case "/add_person":
        id = "add";
        setSelectedState({ selected: "Add person" });
        break;
      default:
        id = "home";
        setSelectedState({ selected: "Home" });
    }
    const currentNode = document.getElementById(id);
    if (currentNode) {
      currentNode.classList.add("selected");
      if (currentNode.parentNode) {
        currentNode.parentNode.classList.add("selected");
      }
    }
  };

  //componentDidMount equivalent, sort of
  /*useEffect(() => {
    // code to run on component mount
    const path = location.pathname;
    setPath(path);
    didMountRef.current = true;
  }, []);
*/
  //componentDidMount or componentDidUpdate equivalent, sort of
  useEffect(() => {
    const path = location.pathname;
    if (!didMountRef) {
      didMountRef.current = true;
      setPath(path);
      return;
    }
    removeClassSelectedFromAll();
    setPath(path);
  }, [location.pathname]);

  /**
   * It sets the selected class on the current Item
   */
  const handleClick = (event) => {
    const currentElem = event.target;
    const currentElemText = currentElem.innerText;
    if (
      !currentElemText ||
      currentElemText.toString().trim() === "" ||
      currentElemText === selectedState.selected
    ) {
      return;
    }
    if (selectedState.selected === "") {
      currentElem.classList.add("selected");
      if (currentElem.parentNode) {
        currentElem.parentNode.classList.add("selected");
      }
      setSelectedState({ selected: currentElemText });
      return;
    }
    /*
    const allLiElems = document.querySelectorAll(
      "div.navbar-container > ul > li > a"
    );
    if (allLiElems && allLiElems.length !== 0) {
      allLiElems.forEach((e) => {
        e.classList.remove("selected");
        if (e.parentNode) {
          e.parentNode.classList.remove("selected");
        }
      });
    }
    */
    removeClassSelectedFromAll();
    currentElem.classList.add("selected");
    if (currentElem.parentNode) {
      currentElem.parentNode.classList.add("selected");
    }
    setSelectedState({ selected: currentElemText });
  };

  return (
    <div className="navbar-container">
      <ul>
        <li>
          <Link id="home" onClick={handleClick} to="/">
            Home
          </Link>
        </li>
        <li>
          <Link id="add" onClick={handleClick} to="add_person">
            Add person
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
