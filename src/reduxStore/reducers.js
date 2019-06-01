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
import simulationLogsFilter from "./simulationLogsFilter/reducer";
import editingConnectionParameters from "./editingConnectionParameters/reducer";
import connectionParameters from "./connectionParameters/reducer";
import userEvents from "./userEvents/reducer";
import currentSimulationHash from "./currentSimulationHash/reducer";

const reducers = {
  customisation,
  programs,
  socket,
  networkTopology,
  customConfig,
  polyglot,
  simulationState,
  simulationNodes,
  simulationLogs,
  simulationLogsFilter,
  editingConnectionParameters,
  connectionParameters,
  userEvents,
  currentSimulationHash
};

export default combineReducers(reducers);
