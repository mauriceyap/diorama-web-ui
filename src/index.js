import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import "metro4/build/css/metro-all.css";
import "metro4";

import Diorama from "./components/Diorama";
import * as serviceWorker from "./serviceWorker";
import reducers from "./reduxStore/reducers";

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Diorama />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
