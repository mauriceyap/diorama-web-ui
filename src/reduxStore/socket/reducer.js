import { createAction, handleActions } from "redux-actions";

const initialState = {
  connected: false
};

function SOCKET_CONNECTED(state) {
  return { ...state, connected: true };
}

function SOCKET_DISCONNECTED(state) {
  return { ...state, connected: false };
}

export const socketConnected = createAction("SOCKET_CONNECTED");
export const socketDisconnected = createAction("SOCKET_DISCONNECTED");

export default handleActions(
  {
    SOCKET_CONNECTED,
    SOCKET_DISCONNECTED
  },
  initialState
);
