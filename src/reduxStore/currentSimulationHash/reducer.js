import { createAction, handleActions } from "redux-actions";

const initialState = "";

function SET_CURRENT_SIMULATION_HASH(state, { payload }) {
  return payload;
}

export const setCurrentSimulationHash = createAction(
  "SET_CURRENT_SIMULATION_HASH"
);

export default handleActions({ SET_CURRENT_SIMULATION_HASH }, initialState);
