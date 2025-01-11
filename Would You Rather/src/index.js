import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore } from "redux";
import reducer from "./reducers/rootReducer";
import { Provider } from "react-redux";
import middleware from "./middleware/applyMidlleware";
import * as serviceWorker from './serviceWorker';
// https://github.com/zalmoxisus/redux-devtools-extension
import { composeWithDevTools } from "redux-devtools-extension";


// From https://redux.js.org/recipes/configuring-your-store
const store = createStore(reducer, composeWithDevTools(middleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();