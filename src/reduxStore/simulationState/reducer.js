import { createAction, handleActions } from "redux-actions";
import { SimulationStateEnum } from "../../constants";

const initialState = SimulationStateEnum.UNINITIALISED;

function SET_SIMULATION_STATE(state, { payload }) {
  return payload;
}

export const setSimulationState = createAction("SET_SIMULATION_STATE");

export default handleActions(
  {
    SET_SIMULATION_STATE
  },
  initialState
);
