import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { getP } from "redux-polyglot";
import { connect } from "react-redux";
import { pPropType } from "../../customPropTypes";
import Socket from "../../Socket";
import SocketEvents from "../../SocketEvents";
import { selectSimulationState } from "../../reduxStore/selectors";
import StartSimulation from "./StartSimulation";
import {
  NODE_INFO_POLLING_INTERVAL,
  SimulationStateEnum
} from "../../constants";
import MetroIcon from "../MetroIcon";
import LoadingScreen from "./LoadingScreen";
import NodeManager from "./NodeManager";
import OutputViewer from "./OutputViewer";

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

class Simulation extends Component {
  componentDidMount() {
    Simulation.getSimulationNodes();
    this.updateRequestInterval = setInterval(
      Simulation.getSimulationNodes,
      NODE_INFO_POLLING_INTERVAL
    );
  }

  static getSimulationNodes() {
    Socket.send(SocketEvents.GET_SIMULATION_NODES);
  }

  static setUpSimulation() {
    Socket.send(SocketEvents.SET_UP_SIMULATION);
  }

  static stopAndResetSimulation() {
    Socket.send(SocketEvents.STOP_AND_RESET_SIMULATION);
  }

  render() {
    const { p, simulationState } = this.props;
    return (
      <Fragment>
        <span className={"display1"}>{p.tc("simulation")}</span>
        {idleStates.includes(simulationState) && (
          <StartSimulation onButtonClick={Simulation.setUpSimulation} />
        )}

        {loadingStates.includes(simulationState) && (
          <LoadingScreen simulationState={simulationState} />
        )}

        {runningStates.includes(simulationState) && (
          <Fragment>
            <div style={{ textAlign: "right" }}>
              <button
                className="button alert"
                onClick={Simulation.stopAndResetSimulation}
              >
                <MetroIcon icon={"stop"} /> Stop and reset
              </button>
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
  simulationState: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    p: getP(state),
    simulationState: selectSimulationState(state)
  };
}

export default connect(mapStateToProps)(Simulation);
