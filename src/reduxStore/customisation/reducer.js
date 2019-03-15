import { createAction, handleActions } from "redux-actions";

const initialState = {
  colourScheme: "default"
};

function SET_COLOUR_SCHEME(state, { payload }) {
  return { ...state, colourScheme: payload };
}

export const setColourScheme = createAction("SET_COLOUR_SCHEME");

export default handleActions(
  {
    SET_COLOUR_SCHEME
  },
  initialState
);
