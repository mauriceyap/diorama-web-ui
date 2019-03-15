import { createAction, handleActions } from "redux-actions";

const initialState = [];

function SET_SIMULATION_NODES(state, { payload }) {
  return payload;
}

export const setSimulationNodes = createAction("SET_SIMULATION_NODES");

export default handleActions({ SET_SIMULATION_NODES }, initialState);
