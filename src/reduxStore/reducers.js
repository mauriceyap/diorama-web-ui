import { combineReducers } from "redux";
import { polyglotReducer as polyglot } from "redux-polyglot";

import customisation from "./customisation/reducer";
import programs from "./programs/reducer";
import socket from "./socket/reducer";
import networkTopology from "./networkTopology/reducer";
import customConfig from "./customConfig/reducer";
import simulationState from "./simulationState/reducer";
import simulationNodes from "./simulationNodes/reducer";
import simulationLogs from "./simulationLogs/reducer";

const reducers = {
  customisation,
  programs,
  socket,
  networkTopology,
  customConfig,
  polyglot,
  simulationState,
  simulationNodes,
  simulationLogs
};

export default combineReducers(reducers);
