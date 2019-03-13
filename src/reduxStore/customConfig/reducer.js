import { createAction, handleActions } from "redux-actions";

const initialState = {};

function SET_CUSTOM_CONFIG(state, { payload }) {
  return { ...state, ...payload };
}

export const setCustomConfig = createAction("SET_CUSTOM_CONFIG");

export default handleActions(
  {
    SET_CUSTOM_CONFIG
  },
  initialState
);
