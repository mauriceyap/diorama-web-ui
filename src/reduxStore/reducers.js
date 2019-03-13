import { combineReducers } from "redux";
import { polyglotReducer as polyglot } from 'redux-polyglot';

import customisation from "./customisation/reducer";
import programs from "./programs/reducer";
import socket from "./socket/reducer";
import networkTopology from "./networkTopology/reducer";
import customConfig from "./customConfig/reducer";

const reducers = {
  customisation,
  programs,
  socket,
  networkTopology,
  customConfig,
  polyglot
};

export default combineReducers(reducers);
