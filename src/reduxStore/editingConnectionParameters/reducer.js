import { createAction, handleActions } from "redux-actions";
import { defaultParameters } from "../../components/NetworkTopologyViewer/constants";

const initialState = {
  ...defaultParameters,
  fromNid: "",
  toNid: ""
};

function SET_CONNECTION_PARAMETERS_EDITOR_FROM_NID(state, { payload }) {
  return { ...state, fromNid: payload };
}

function SET_CONNECTION_PARAMETERS_EDITOR_TO_NID(state, { payload }) {
  return { ...state, toNid: payload };
}

function SET_CONNECTION_PARAMETERS_EDITOR_DELAY_DISTRIBUTION(
  state,
  { payload }
) {
  return { ...state, delayDistribution: payload };
}

function SET_CONNECTION_PARAMETERS_EDITOR_SUCCESS_RATE(state, { payload }) {
  return { ...state, successRate: payload };
}

function SET_CONNECTION_PARAMETERS_EDITOR_DELAY_DISTRIBUTION_PARAMETERS(
  state,
  { payload }
) {
  return { ...state, delayDistributionParameters: payload };
}

export const setConnectionParametersEditorFromNid = createAction(
  "SET_CONNECTION_PARAMETERS_EDITOR_FROM_NID"
);
export const setConnectionParametersEditorToNid = createAction(
  "SET_CONNECTION_PARAMETERS_EDITOR_TO_NID"
);
export const setConnectionParametersEditorDelayDistribution = createAction(
  "SET_CONNECTION_PARAMETERS_EDITOR_DELAY_DISTRIBUTION"
);
export const setConnectionParametersEditorDelayDistributionParameters = createAction(
  "SET_CONNECTION_PARAMETERS_EDITOR_DELAY_DISTRIBUTION_PARAMETERS"
);
export const setConnectionParametersEditorSuccessRate = createAction(
  "SET_CONNECTION_PARAMETERS_EDITOR_SUCCESS_RATE"
);

export default handleActions(
  {
    SET_CONNECTION_PARAMETERS_EDITOR_FROM_NID,
    SET_CONNECTION_PARAMETERS_EDITOR_TO_NID,
    SET_CONNECTION_PARAMETERS_EDITOR_DELAY_DISTRIBUTION,
    SET_CONNECTION_PARAMETERS_EDITOR_DELAY_DISTRIBUTION_PARAMETERS,
    SET_CONNECTION_PARAMETERS_EDITOR_SUCCESS_RATE
  },
  initialState
);
