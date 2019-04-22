import { createAction, handleActions } from "redux-actions";

const initialState = {};

function SET_CONNECTION_PARAMETERS(state, { payload }) {
  return payload;
}

export const setConnectionParameters = createAction(
  "SET_CONNECTION_PARAMETERS"
);

export default handleActions(
  {
    SET_CONNECTION_PARAMETERS
  },
  initialState
);
