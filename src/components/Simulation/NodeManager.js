import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getP } from "redux-polyglot";
import { pPropType } from "../../customPropTypes";
import { selectSimulationNodes } from "../../reduxStore/selectors";
import { runtimeIcons, runtimeLabels } from "../Programs/constants";
import MetroIcon from "../MetroIcon";
import NodeManagerButton from "./NodeManagerButton";

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

const visibleButtonsForStatus = {
  created: ["start"],
  restarting: [],
  running: ["stop", "pause"],
  removing: [], // shouldn't be seen
  paused: ["unpause", "stop"],
  exited: ["start"],
  dead: [] // shouldn't be seen
};

class NodeManager extends Component {
  render() {
    const { simulationNodes } = this.props;
    return (
      <div key={simulationNodes.map(({ nid, status }) => `${nid}${status}`)}>
        <table className="table">
          <thead>
            <tr>
              <th data-sortable="true">Node ID (nid)</th>
              <th data-sortable="true">Status</th>
              <th data-sortable="true">Program</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {simulationNodes.map(
              ({ nid, status, program, runtime, description }) => (
                <tr key={nid}>
                  <td>{nid}</td>
                  <td>
                    <MetroIcon
                      icon={statusLabelsIcons[status]["icon"]}
                      colour={statusLabelsIcons[status]["colour"]}
                    />{" "}
                    {statusLabelsIcons[status]["label"]}
                  </td>
                  <td>
                    <span
                      data-role="popover"
                      data-popover-text={description}
                      data-hide-on-leave={true}
                    >
                      {program}
                    </span>
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
                    {visibleButtonsForStatus[status].map(action => (
                      <NodeManagerButton
                        action={action}
                        nid={nid}
                        key={nid + action}
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
  simulationNodes: PropTypes.arrayOf(PropTypes.object).isRequired
};

function mapStateToProps(state) {
  return {
    p: getP(state),
    simulationNodes: selectSimulationNodes(state)
  };
}

export default connect(mapStateToProps)(NodeManager);
