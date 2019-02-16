import { createAction, handleActions } from "redux-actions";

const initialState = {
  colourScheme: "default",
  dateTimeLocale: "en-gb",
};

function SET_COLOUR_SCHEME(state, { payload }) {
  return { ...state, colourScheme: payload };
}

function SET_DATE_TIME_LOCALE_SCHEME(state, { payload }) {
  return { ...state, dateTimeLocale: payload };
}

export const setColourScheme = createAction("SET_COLOUR_SCHEME");
export const setDateTimeLocale = createAction("SET_DATE_TIME_LOCALE_SCHEME");

export default handleActions(
  {
    SET_COLOUR_SCHEME,
    SET_DATE_TIME_LOCALE_SCHEME
  },
  initialState
);
