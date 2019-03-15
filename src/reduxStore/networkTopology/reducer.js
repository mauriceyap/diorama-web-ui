import { createAction, handleActions } from "redux-actions";
import { INITIAL_NETWORK_TOPOLOGY_LANGUAGE } from "../../constants";

const initialState = {
  rawNetworkTopology: "",
  unpackedNetworkTopology: [],
  language: INITIAL_NETWORK_TOPOLOGY_LANGUAGE
};

function SET_RAW_NETWORK_TOPOLOGY(state, { payload }) {
  return { ...state, rawNetworkTopology: payload };
}

function SET_UNPACKED_NETWORK_TOPOLOGY(state, { payload }) {
  return { ...state, unpackedNetworkTopology: payload };
}

function SET_NETWORK_TOPOLOGY_LANGUAGE(state, { payload }) {
  return { ...state, language: payload };
}

export const setRawNetworkTopology = createAction("SET_RAW_NETWORK_TOPOLOGY");
export const setUnpackedNetworkTopology = createAction(
  "SET_UNPACKED_NETWORK_TOPOLOGY"
);
export const setNetworkTopologyLanguage = createAction(
  "SET_NETWORK_TOPOLOGY_LANGUAGE"
);

export default handleActions(
  {
    SET_RAW_NETWORK_TOPOLOGY,
    SET_NETWORK_TOPOLOGY_LANGUAGE,
    SET_UNPACKED_NETWORK_TOPOLOGY
  },
  initialState
);
