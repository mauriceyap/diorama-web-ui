import { createAction, handleActions } from "redux-actions";

const initialState = {
  messageDoesContainPattern: "",
  messageDoesContainIsRegex: false,
  messageDoesNotContainPattern: "",
  nidDoesContainPattern: "",
  nidDoesContainIsRegex: false,
  nidDoesNotContainPattern: "",
  nodePrograms: [],
  nodeNids: []
};

function SET_LOGS_FILTER_MESSAGE_DOES_CONTAIN_PATTERN(state, { payload }) {
  return { ...state, messageDoesContainPattern: payload };
}

function SET_LOGS_FILTER_MESSAGE_DOES_CONTAIN_IS_REGEX(state, { payload }) {
  return { ...state, messageDoesContainIsRegex: payload };
}

function SET_LOGS_FILTER_MESSAGE_DOES_NOT_CONTAIN_PATTERN(state, { payload }) {
  return { ...state, messageDoesNotContainPattern: payload };
}

function SET_LOGS_FILTER_NID_DOES_CONTAIN_PATTERN(state, { payload }) {
  return { ...state, nidDoesContainPattern: payload };
}

function SET_LOGS_FILTER_NID_DOES_CONTAIN_IS_REGEX(state, { payload }) {
  return { ...state, nidDoesContainIsRegex: payload };
}

function SET_LOGS_FILTER_NID_DOES_NOT_CONTAIN_PATTERN(state, { payload }) {
  return { ...state, nidDoesNotContainPattern: payload };
}

function SET_LOGS_FILTER_NODE_PROGRAMS(state, { payload }) {
  return { ...state, nodePrograms: payload };
}

function SET_LOGS_FILTER_NODE_NIDS(state, { payload }) {
  return { ...state, nodeNids: payload };
}

export const setMessageDoesContainPattern = createAction(
  "SET_LOGS_FILTER_MESSAGE_DOES_CONTAIN_PATTERN"
);
export const setMessageDoesContainIsRegex = createAction(
  "SET_LOGS_FILTER_MESSAGE_DOES_CONTAIN_IS_REGEX"
);
export const setMessageDoesNotContainPattern = createAction(
  "SET_LOGS_FILTER_MESSAGE_DOES_NOT_CONTAIN_PATTERN"
);
export const setNidDoesContainPattern = createAction(
  "SET_LOGS_FILTER_NID_DOES_CONTAIN_PATTERN"
);
export const setNidDoesContainIsRegex = createAction(
  "SET_LOGS_FILTER_NID_DOES_CONTAIN_IS_REGEX"
);
export const setNidDoesNotContainPattern = createAction(
  "SET_LOGS_FILTER_NID_DOES_NOT_CONTAIN_PATTERN"
);
export const setNodePrograms = createAction("SET_LOGS_FILTER_NODE_PROGRAMS");
export const setNodeNids = createAction("SET_LOGS_FILTER_NODE_NIDS");

export default handleActions(
  {
    SET_LOGS_FILTER_MESSAGE_DOES_CONTAIN_PATTERN,
    SET_LOGS_FILTER_MESSAGE_DOES_CONTAIN_IS_REGEX,
    SET_LOGS_FILTER_MESSAGE_DOES_NOT_CONTAIN_PATTERN,
    SET_LOGS_FILTER_NID_DOES_CONTAIN_PATTERN,
    SET_LOGS_FILTER_NID_DOES_CONTAIN_IS_REGEX,
    SET_LOGS_FILTER_NID_DOES_NOT_CONTAIN_PATTERN,
    SET_LOGS_FILTER_NODE_PROGRAMS,
    SET_LOGS_FILTER_NODE_NIDS
  },
  initialState
);
