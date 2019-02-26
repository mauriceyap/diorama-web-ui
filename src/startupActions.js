import { addProgram } from "./reduxStore/programs/reducer";
import { setLanguage } from "redux-polyglot";
import translations from "./translations";
import Socket from "./Socket";
import {
  socketConnected,
  socketDisconnected
} from "./reduxStore/socket/reducer";
import {
  setCompiledNetworkTopology,
  setNetworkTopologyLanguage,
  setRawNetworkTopology
} from "./reduxStore/networkTopology/reducer";
import { setAdvancedSettings } from "./reduxStore/advancedSettings/reducer";
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

    [SocketEvents.COMPILED_NETWORK_TOPOLOGY](topology) {
      dispatch(setCompiledNetworkTopology(topology));
    },

    [SocketEvents.ADVANCED_SETTINGS](settings) {
      dispatch(setAdvancedSettings(settings));
    }
  };
  // get these things from the server
  dispatch(setLanguage("en-gb", translations["en-gb"]));

  // dispatch(
  //   addProgram({
  //     name: "master",
  //     runtime: "python3",
  //     mainHandler: "node.main",
  //     codeSource: "raw",
  //     codeData: "print('hello world lol')",
  //     lastEdited: 1550249133000,
  //     description: "you are not my master"
  //   })
  // );
  Socket.setOnSocketConnected(() => dispatch(socketConnected()));
  Socket.setOnSocketDisconnected(() => dispatch(socketDisconnected()));
  Socket.setOnSocketError(() => dispatch(socketDisconnected()));

  Object.keys(onReceiveEvent).forEach(event => {
    Socket.onResponse(event, onReceiveEvent[event]);
  });

  Socket.connectWebSocket();

  Socket.send(SocketEvents.GET_PROGRAMS)
}
