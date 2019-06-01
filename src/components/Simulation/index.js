import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { getP } from "redux-polyglot";
import { connect } from "react-redux";
import { pPropType } from "../../customPropTypes";
import Socket from "../../Socket";
import SocketEvents from "../../SocketEvents";
import {
  selectCurrentSimulationHash,
  selectNetworkTopology,
  selectPrograms,
  selectSimulationNodes,
  selectSimulationState,
  selectUserEvents
} from "../../reduxStore/selectors";
import StartSimulation from "./StartSimulation";
import { SimulationStateEnum } from "../../constants";
import MetroIcon from "../MetroIcon";
import LoadingScreen from "./LoadingScreen";
import NodeManager from "./NodeManager";
import OutputViewer from "./OutputViewer";
import { clearSimulationLogs } from "../../reduxStore/simulationLogs/reducer";
import Metro from "metro4";
import { userEventsDialogId } from "../../styleConstants";

const idleStates = [SimulationStateEnum.UNINITIALISED];
const loadingStates = [
  SimulationStateEnum.CREATING_NODES,
  SimulationStateEnum.CREATING_PROGRAM_IMAGES,
  SimulationStateEnum.CREATING_VIRTUAL_NETWORK,
  SimulationStateEnum.RESETTING
];
const runningStates = [
  SimulationStateEnum.READY_TO_RUN,
  SimulationStateEnum.RUNNING
];

export const possibleActionsForStatus = {
  created: ["start"],
  restarting: [],
  running: ["stop", "pause"],
  removing: [], // shouldn't be seen
  paused: ["unpause", "stop"],
  exited: ["start"],
  dead: [] // shouldn't be seen
};

class Simulation extends Component {
  constructor(props) {
    super(props);
    this.getSimulationNodes = this.getSimulationNodes.bind(this);
    this.stopAndResetSimulation = this.stopAndResetSimulation.bind(this);
    this.setUpSimulation = this.setUpSimulation.bind(this);
    this.createSimulationHash = this.createSimulationHash.bind(this);
    this.hasChangesToCurrentSimulation = this.hasChangesToCurrentSimulation.bind(
      this
    );
  }

  componentDidMount() {
    const { p } = this.props;
    this.getSimulationNodes();
    document.title = `Diorama - ${p.tc("simulation")}`;
  }

  createSimulationHash() {
    const { programs, unpackedNetworkTopology } = this.props;
    return btoa(JSON.stringify({ programs, unpackedNetworkTopology }));
  }

  hasChangesToCurrentSimulation() {
    const { currentSimulationHash } = this.props;
    return this.createSimulationHash() !== currentSimulationHash;
  }

  getSimulationNodes() {
    const { isSimulationNodesEmpty } = this.props;
    if (isSimulationNodesEmpty) {
      Simulation.getInitialSimulationLogs();
    }
    Socket.send(SocketEvents.GET_SIMULATION_NODES);
  }

  static getInitialSimulationLogs() {
    Socket.send(SocketEvents.STREAM_NODE_LOGS, { all: true });
  }

  setUpSimulation() {
    Socket.send(SocketEvents.SET_UP_SIMULATION);
    Socket.send(
      SocketEvents.SET_CURRENT_SIMULATION_HASH,
      this.createSimulationHash()
    );
    Socket.send(SocketEvents.GET_CURRENT_SIMULATION_HASH);
  }

  stopAndResetSimulation() {
    const { dispatch } = this.props;
    Socket.send(SocketEvents.STOP_AND_RESET_SIMULATION);
    dispatch(clearSimulationLogs());
  }

  static openUserEventsDialog() {
    Metro.dialog.open(`#${userEventsDialogId}`);
  }

  render() {
    const { p, simulationState, isUserEventsRunning } = this.props;
    return (
      <Fragment>
        <span className={"display1"}>{p.tc("simulation")}</span>
        {idleStates.includes(simulationState) && (
          <StartSimulation onButtonClick={this.setUpSimulation} />
        )}

        {loadingStates.includes(simulationState) && (
          <LoadingScreen simulationState={simulationState} />
        )}

        {runningStates.includes(simulationState) && (
          <Fragment>
            <div
              className="mt-4"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                {isUserEventsRunning ? (
                  <button className="button primary disabled">
                    <MetroIcon icon={"spinner"} /> Running scheduled events
                  </button>
                ) : (
                  <button
                    className="button primary"
                    onClick={Simulation.openUserEventsDialog}
                  >
                    <MetroIcon icon={"event-available"} /> Schedule events
                  </button>
                )}
              </div>
              <div>
                <button
                  className="button alert"
                  onClick={this.stopAndResetSimulation}
                >
                  <MetroIcon icon={"stop"} /> Stop and reset{" "}
                  {this.hasChangesToCurrentSimulation() && (
                    <span className="badge bg-lightOrange inline fg-white">
                      New changes have been made
                    </span>
                  )}
                </button>
              </div>
            </div>
            <div className="mt-6">
              <ul data-role="tabs" data-tabs-type="group" data-expand="true">
                <li>
                  <a href="#node-manager">Manage nodes</a>
                </li>
                <li>
                  <a href="#output-viewer">Output viewer</a>
                </li>
              </ul>
              <div id="node-manager">
                <NodeManager />
              </div>
              <div id="output-viewer">
                <OutputViewer />
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }

  componentWillUnmount() {
    clearInterval(this.updateRequestInterval);
  }
}

Simulation.propTypes = {
  p: pPropType.isRequired,
  simulationState: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  isSimulationNodesEmpty: PropTypes.bool.isRequired,
  isUserEventsRunning: PropTypes.bool.isRequired,
  currentSimulationHash: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    p: getP(state),
    simulationState: selectSimulationState(state),
    isSimulationNodesEmpty: selectSimulationNodes(state).length === 0,
    isUserEventsRunning: selectUserEvents(state).isRunning,
    currentSimulationHash: selectCurrentSimulationHash(state),
    programs: selectPrograms(state),
    unpackedNetworkTopology: selectNetworkTopology(state)
      .unpackedNetworkTopology
  };
}

export default connect(mapStateToProps)(Simulation);
