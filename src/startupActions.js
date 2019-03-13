import { addProgram } from "./reduxStore/programs/reducer";
import { setLanguage } from "redux-polyglot";
import translations from "./translations";
import Socket from "./Socket";
import {
  socketConnected,
  socketDisconnected
} from "./reduxStore/socket/reducer";
import {
  setUnpackedNetworkTopology,
  setNetworkTopologyLanguage,
  setRawNetworkTopology
} from "./reduxStore/networkTopology/reducer";
import { setCustomConfig } from "./reduxStore/customConfig/reducer";
import SocketEvents from "./SocketEvents";

export default function(dispatch) {
  const onReceiveEvent = {
    [SocketEvents.PROGRAMS](programs) {
      programs.forEach(program => dispatch(addProgram(program)));
    },

    [SocketEvents.RAW_NETWORK_TOPOLOGY](topology) {
      dispatch(setRawNetworkTopology(topology));
    },

    [SocketEvents.NETWORK_TOPOLOGY_LANGUAGE](language) {
      dispatch(setNetworkTopologyLanguage(language));
    },

    [SocketEvents.UNPACKED_NETWORK_TOPOLOGY](topology) {
      dispatch(setUnpackedNetworkTopology(topology));
    },

    [SocketEvents.CUSTOM_CONFIG](settings) {
      dispatch(setCustomConfig(settings));
    }
  };
  // get these things from the server
  dispatch(setLanguage("en-gb", translations["en-gb"]));

  Socket.setOnSocketConnected(() => dispatch(socketConnected()));
  Socket.setOnSocketDisconnected(() => dispatch(socketDisconnected()));
  Socket.setOnSocketError(() => dispatch(socketDisconnected()));

  Object.keys(onReceiveEvent).forEach(event => {
    Socket.onResponse(event, onReceiveEvent[event]);
  });

  Socket.connectWebSocket();

  Socket.send(SocketEvents.GET_PROGRAMS);
  Socket.send(SocketEvents.GET_RAW_NETWORK_TOPOLOGY);
  Socket.send(SocketEvents.GET_CUSTOM_CONFIG);
}
