import { createAction, handleActions } from "redux-actions";

const initialState = [];

function ADD_SIMULATION_LOGS(state, { payload }) {
  return [...state, payload];
}

function CLEAR_SIMULATION_LOGS() {
  return initialState;
}

export const addSimulationLogs = createAction("ADD_SIMULATION_LOGS");
export const clearSimulationLogs = createAction("CLEAR_SIMULATION_LOGS");

export default handleActions(
  { ADD_SIMULATION_LOGS, CLEAR_SIMULATION_LOGS },
  initialState
);
