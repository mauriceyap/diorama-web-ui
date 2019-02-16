import { combineReducers } from "redux";
import { polyglotReducer as polyglot } from 'redux-polyglot';

import customisation from "./customisation/reducer";
import programs from "./programs/reducer";
import socket from "./socket/reducer";
import networkTopology from "./networkTopology/reducer";
import advancedSettings from "./advancedSettings/reducer";

const reducers = {
  customisation,
  programs,
  socket,
  networkTopology,
  advancedSettings,
  polyglot
};

export default combineReducers(reducers);
