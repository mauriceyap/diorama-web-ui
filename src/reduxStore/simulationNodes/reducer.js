import { createAction, handleActions } from "redux-actions";
import { loggingColours } from "../../styleConstants";

const initialState = [];

function withLoggingColours(nodes) {
  return nodes.map((node, index) => ({
    ...node,
    loggingColour: loggingColours[index % loggingColours.length]
  }));
}

function SET_SIMULATION_NODES(state, { payload }) {
  return withLoggingColours(payload);
}

export const setSimulationNodes = createAction("SET_SIMULATION_NODES");

export default handleActions({ SET_SIMULATION_NODES }, initialState);
