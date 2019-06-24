import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getP } from "redux-polyglot";
import { pPropType } from "../../customPropTypes";
import {
  selectSimulationLogs,
  selectSimulationNodes
} from "../../reduxStore/selectors";
import { runtimeIcons, runtimeLabels } from "../Programs/constants";
import MetroIcon from "../MetroIcon";
import NodeManagerButton from "./NodeManagerButton";
import { possibleActionsForStatus } from "./index";

const runtimeIconStyle = {
  float: "right",
  height: "1.2rem"
};

const statusLabelsIcons = {
  created: { icon: "hotel", colour: "crimson", label: "stopped" },
  restarting: { icon: "loop2", colour: "amber", label: "restarting" },
  running: { icon: "airplane", colour: "emerald", label: "running" },
  removing: {
    icon: "thumbs-down",
    colour: "lightViolet",
    label: "containerError"
  }, // shouldn't be seen
  paused: { icon: "pause", colour: "darkCobalt", label: "paused" },
  exited: { icon: "hotel", colour: "crimson", label: "stopped" },
  dead: { icon: "thumbs-down", colour: "lightViolet", label: "containerError" } // shouldn't be seen
};

class NodeManager extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedNodesNids: [] };

    this.getAllNodeNids = this.getAllNodeNids.bind(this);
    this.getAreAllNodesSelected = this.getAreAllNodesSelected.bind(this);
    this.toggleAllNodesSelected = this.toggleAllNodesSelected.bind(this);
    this.toggleSelectedNodeNid = this.toggleSelectedNodeNid.bind(this);
    this.getSelectedNodesPossibleActions = this.getSelectedNodesPossibleActions.bind(
      this
    );
  }

  getAllNodeNids() {
    const { simulationNodes } = this.props;
    return simulationNodes.map(({ nid }) => nid);
  }

  getAreAllNodesSelected() {
    const { selectedNodesNids } = this.state;
    return this.getAllNodeNids().length === selectedNodesNids.length;
  }

  toggleAllNodesSelected() {
    this.setState(
      this.getAreAllNodesSelected()
        ? { selectedNodesNids: [] }
        : { selectedNodesNids: this.getAllNodeNids() }
    );
  }

  toggleSelectedNodeNid(nidToToggle) {
    const { selectedNodesNids: oldSelectedNodeNids } = this.state;
    const selectedNodesNids = oldSelectedNodeNids.contains(nidToToggle)
      ? oldSelectedNodeNids.filter(nid => nid !== nidToToggle)
      : [...oldSelectedNodeNids, nidToToggle];
    this.setState({
      selectedNodesNids
    });
  }

  getSelectedNodesPossibleActions() {
    const { selectedNodesNids } = this.state;
    const { simulationNodes } = this.props;
    return selectedNodesNids.reduce((acc, nid) => {
      const nodeStatus = simulationNodes.filter(
        ({ nid: thatNid }) => thatNid === nid
      )[0].status;
      possibleActionsForStatus[nodeStatus].forEach(action => {
        const existingNids = acc[action] || [];
        acc[action] = [...existingNids, nid];
      });
      return acc;
    }, {});
  }

  render() {
    const { simulationNodes, latestLogTimestampForNode, p } = this.props;
    const { selectedNodesNids } = this.state;
    const selectedNodesPossibleActions = this.getSelectedNodesPossibleActions();
    return (
      <div key={simulationNodes.map(({ nid, status }) => `${nid}${status}`)}>
        {selectedNodesNids.length > 0 ? (
          <div>
            <div className="mt-2 mb-2">
              {Object.keys(selectedNodesPossibleActions).map(action => (
                <Fragment key={action}>
                  <NodeManagerButton
                    action={action}
                    nids={selectedNodesPossibleActions[action]}
                    latestTimestamps={selectedNodesPossibleActions[
                      action
                    ].reduce(
                      (acc, nid) => ({
                        ...acc,
                        [nid]: latestLogTimestampForNode[nid]
                      }),
                      {}
                    )}
                    key={`selected${action}`}
                  />{" "}
                </Fragment>
              ))}
            </div>
          </div>
        ) : (
          <Fragment />
        )}
        <table className="table row-border table-border">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>
                <input
                  type="checkbox"
                  data-role="checkbox"
                  onChange={this.toggleAllNodesSelected}
                  checked={this.getAreAllNodesSelected()}
                />
              </th>
              <th>{p.tc("simulation.nodeID")} (nid)</th>
              <th>{p.tc("simulation.status")}</th>
              <th>{p.tc("simulation.program")}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {simulationNodes.map(
              ({
                nid,
                status,
                program,
                runtime,
                description,
                loggingColour
              }) => (
                <tr
                  key={nid}
                  className={selectedNodesNids.contains(nid) ? "bg-gray" : ""}
                >
                  <td
                    className={`bg-${loggingColour}`}
                    style={{ textAlign: "center" }}
                    key={selectedNodesNids}
                  >
                    <input
                      type="checkbox"
                      data-role="checkbox"
                      onChange={() => {
                        this.toggleSelectedNodeNid(nid);
                      }}
                      checked={selectedNodesNids.contains(nid)}
                    />
                  </td>
                  <td>{nid}</td>
                  <td>
                    <MetroIcon
                      icon={statusLabelsIcons[status]["icon"]}
                      colour={statusLabelsIcons[status]["colour"]}
                    />{" "}
                    {p.tc(`simulation.${statusLabelsIcons[status]["label"]}`)}
                  </td>
                  <td>
                    {description ? (
                      <span
                        data-role="popover"
                        data-popover-text={description}
                        data-hide-on-leave={true}
                      >
                        {program}
                      </span>
                    ) : (
                      program
                    )}
                    <img
                      src={runtimeIcons[runtime]}
                      alt={runtime}
                      style={runtimeIconStyle}
                      data-role="popover"
                      data-popover-text={runtimeLabels[runtime]}
                      data-hide-on-leave={true}
                    />
                  </td>
                  <td>
                    {possibleActionsForStatus[status].map(action => (
                      <NodeManagerButton
                        compact
                        action={action}
                        nids={[nid]}
                        key={nid + action}
                        latestTimestamps={{
                          [nid]: latestLogTimestampForNode[nid]
                        }}
                      />
                    ))}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

NodeManager.propTypes = {
  p: pPropType.isRequired,
  simulationNodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  latestLogTimestampForNode: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    p: getP(state),
    simulationNodes: selectSimulationNodes(state),
    latestLogTimestampForNode: selectSimulationLogs(state).reduce(
      (latestLogs, { nid, timestamp }) => {
        const latestForNode = latestLogs[nid];
        if ((latestForNode && timestamp > latestForNode) || !latestForNode) {
          latestLogs[nid] = timestamp;
        }
        return latestLogs;
      },
      {}
    )
  };
}

export default connect(mapStateToProps)(NodeManager);
