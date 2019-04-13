import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  selectSimulationLogs,
  selectSimulationLogsFilter,
  selectSimulationNodes
} from "../../reduxStore/selectors";
import DateTime from "../common/DateTime";

import ExportDataAccordion from "./ExportDataAccordion";
import OutputFilteringAccordion from "./OutputFilteringAccordion";

class OutputViewer extends Component {
  constructor(props) {
    super(props);
    this.logFilter = this.logFilter.bind(this);
  }

  logFilter({ nid, message }) {
    const {
      simulationLogsFilter: {
        messageDoesContainPattern,
        messageDoesContainIsRegex,
        messageDoesNotContainPattern,
        nidDoesContainPattern,
        nidDoesContainIsRegex,
        nidDoesNotContainPattern,
        nodePrograms,
        nodeNids
      },
      programForNode
    } = this.props;
    if (messageDoesContainPattern.length > 0) {
      if (messageDoesContainIsRegex) {
        try {
          if (!message.match(new RegExp(messageDoesContainPattern)))
            return false;
        } catch (err) {}
      } else {
        if (!message.contains(messageDoesContainPattern)) return false;
      }
    }
    if (
      messageDoesNotContainPattern.length > 0 &&
      message.contains(messageDoesNotContainPattern)
    ) {
      return false;
    }

    if (
      nodePrograms.length > 0 &&
      !nodePrograms.contains(programForNode[nid])
    ) {
      return false;
    }
    if (nodeNids.length > 0 && !nodeNids.contains(nid)) {
      return false;
    }
    if (nidDoesContainPattern.length > 0) {
      if (nidDoesContainIsRegex) {
        try {
          if (!nid.match(new RegExp(nidDoesContainPattern))) return false;
        } catch (err) {}
      } else {
        if (!nid.contains(nidDoesContainPattern)) return false;
      }
    }
    return !(
      nidDoesNotContainPattern.length > 0 &&
      nid.contains(nidDoesNotContainPattern)
    );
  }

  render() {
    const { simulationLogs, nodeColours } = this.props;
    return (
      <Fragment>
        <OutputFilteringAccordion />
        <ExportDataAccordion />
        <table className="table compact row-border table-border">
          <thead>
            <tr>
              <th>Node ID (nid)</th>
              <th>Timestamp</th>
              <th>Output</th>
            </tr>
          </thead>
          <tbody>
            {simulationLogs
              .filter(this.logFilter)
              .map(({ message, timestamp, nid }) => (
                <tr
                  className={`bg-${nodeColours[nid]}`}
                  key={nid + message + timestamp}
                >
                  <td>{nid}</td>
                  <td>
                    <DateTime dateTime={timestamp} format={"LTS.SSS"} />
                  </td>
                  <td>{message}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

OutputViewer.propTypes = {
  simulationLogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  nodeColours: PropTypes.objectOf(PropTypes.string).isRequired,
  programForNode: PropTypes.objectOf(PropTypes.string).isRequired,
  simulationLogsFilter: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    nodeColours: selectSimulationNodes(state).reduce(
      (accColours, { nid, loggingColour }) => ({
        ...accColours,
        [nid]: loggingColour
      }),
      {}
    ),
    simulationLogs: selectSimulationLogs(state).sort(
      ({ timestamp: a }, { timestamp: b }) => (a < b ? -1 : a > b ? 1 : 0)
    ),
    programForNode: selectSimulationNodes(state).reduce(
      (accPrograms, { nid, program }) => ({ ...accPrograms, [nid]: program }),
      {}
    ),
    simulationLogsFilter: selectSimulationLogsFilter(state)
  };
}

export default connect(mapStateToProps)(OutputViewer);
