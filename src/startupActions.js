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

export default function(dispatch) {
  const onReceiveEvent = {
    programs(programs) {
      programs.forEach(program => dispatch(addProgram(program)));
    },

    rawNetworkTopology(topology) {
      dispatch(setRawNetworkTopology(topology));
    },

    networkTopologyLanguage(language) {
      dispatch(setNetworkTopologyLanguage(language));
    },

    compiledNetworkTopology(topology) {
      dispatch(setCompiledNetworkTopology(topology));
    },

    advancedSettings(settings) {
      dispatch(setAdvancedSettings(settings));
    }
  };
  // get these things from the server
  dispatch(setLanguage("en-gb", translations["en-gb"]));

  dispatch(
    addProgram({
      name: "master",
      runtime: "python3",
      mainHandler: "node.main",
      codeSource: "raw",
      codeData: "print('hello world lol')",
      lastEdited: 1550249133000,
      description: "you are not my master"
    })
  );
  Socket.setOnSocketConnected(() => dispatch(socketConnected()));
  Socket.setOnSocketDisconnected(() => dispatch(socketDisconnected()));
  Socket.setOnSocketError(() => dispatch(socketDisconnected()));

  Object.keys(onReceiveEvent).forEach(event => {
    Socket.onResponse(event, onReceiveEvent[event]);
  });

  Socket.connectWebSocket();
}
