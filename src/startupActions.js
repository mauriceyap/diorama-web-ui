import { setAllPrograms } from "./reduxStore/programs/reducer";
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
import { setSimulationState } from "./reduxStore/simulationState/reducer";
import { SimulationStateEnum } from "./constants";
import { setSimulationNodes } from "./reduxStore/simulationNodes/reducer";
import { addSimulationLogs } from "./reduxStore/simulationLogs/reducer";
import { setConnectionParameters } from "./reduxStore/connectionParameters/reducer";
import { setCurrentSimulationHash } from "./reduxStore/currentSimulationHash/reducer";

export default function(dispatch) {
  const onReceiveEvent = {
    [SocketEvents.PROGRAMS](programs) {
      dispatch(setAllPrograms(programs));
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
    },

    [SocketEvents.SIMULATION_STATE](simulationState) {
      dispatch(setSimulationState(SimulationStateEnum[simulationState]));
    },

    [SocketEvents.SIMULATION_NODES](simulationNodes) {
      dispatch(setSimulationNodes(simulationNodes));
    },

    [SocketEvents.SIMULATION_LOGS](simulationLogs) {
      dispatch(addSimulationLogs(simulationLogs));
    },

    [SocketEvents.UNPACKED_NETWORK_TOPOLOGY](topology) {
      dispatch(setUnpackedNetworkTopology(topology));
    },

    [SocketEvents.CONNECTION_PARAMETERS](connectionParameters) {
      dispatch(setConnectionParameters(connectionParameters));
    },

    [SocketEvents.CURRENT_SIMULATION_HASH](currentSimulationHash) {
      dispatch(setCurrentSimulationHash(currentSimulationHash));
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
  Socket.send(SocketEvents.GET_SIMULATION_STATE);
  Socket.send(SocketEvents.GET_UNPACKED_NETWORK_TOPOLOGY);
  Socket.send(SocketEvents.GET_CONNECTION_PARAMETERS);
  Socket.send(SocketEvents.GET_CURRENT_SIMULATION_HASH);
}
