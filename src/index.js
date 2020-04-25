import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import personsReducer from "./store/reducers/persons-reducer";
import budgetReducer from "./store/reducers/budget-reducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:9091/api/v1";

axios.interceptors.request.use(
  (request) => {
    console.log("Request: ", request);
    return request;
  },
  (error) => {
    console.log("Error: ", error);
    return Promise.reject(error);
  }
);

const rootReducer = combineReducers({
  personsState: personsReducer,
  budgetState: budgetReducer,
});

const logger = (store) => {
  return (next) => {
    return (action) => {
      console.log("[Middleware]dispatched=", action);
      const result = next(action);
      console.log("[Middleware]next state=", store.getState());
      return result;
    };
  };
};

const store = createStore(rootReducer, applyMiddleware(logger));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
