import { createAction, handleActions } from "redux-actions";

const initialState = {};

function SET_ADVANCED_SETTINGS(state, { payload }) {
  return { ...state, ...payload };
}

export const setAdvancedSettings = createAction("SET_ADVANCED_SETTINGS");

export default handleActions(
  {
    SET_ADVANCED_SETTINGS
  },
  initialState
);
