import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getP } from "redux-polyglot";
import { pPropType } from "../../customPropTypes";
import {
  selectPrograms,
  selectSimulationLogs,
  selectSimulationNodes
} from "../../reduxStore/selectors";
import DateTime from "../common/DateTime";
import {
  onChangeOutputViewerProgramFilter,
  onChangeOutputViewerNodeFilter
} from "../../styleConstants";
import ExportDataAccordion from "./ExportDataAccordion";

class OutputViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageFilterParams: {
        doesContain: { pattern: "", isRegex: false },
        doesNotContain: { pattern: "" }
      },
      nodeFilterPrograms: [],
      nodeFilterNodes: [],
      nidFilterParams: {
        doesContain: { pattern: "", isRegex: false },
        doesNotContain: { pattern: "" }
      }
    };

    window[onChangeOutputViewerProgramFilter] = this.onChangeProgramFilter.bind(
      this
    );
    window[onChangeOutputViewerNodeFilter] = this.onChangeNodeFilter.bind(this);
    this.setMessageDoesContainPattern = this.setMessageDoesContainPattern.bind(
      this
    );
    this.setMessageDoesNotContainPattern = this.setMessageDoesNotContainPattern.bind(
      this
    );
    this.setMessageDoesContainIsRegex = this.setMessageDoesContainIsRegex.bind(
      this
    );

    this.setNidDoesContainPattern = this.setNidDoesContainPattern.bind(this);
    this.setNidDoesNotContainPattern = this.setNidDoesNotContainPattern.bind(
      this
    );
    this.setNidDoesContainIsRegex = this.setNidDoesContainIsRegex.bind(this);
    this.logFilter = this.logFilter.bind(this);
  }

  onChangeProgramFilter(selected) {
    this.setState({
      nodeFilterPrograms: selected
    });
  }

  onChangeNodeFilter(selected) {
    this.setState({
      nodeFilterNodes: selected
    });
  }

  setMessageDoesContainPattern({ target: { value } }) {
    const { messageFilterParams } = this.state;
    const { doesContain } = messageFilterParams;
    this.setState({
      messageFilterParams: {
        ...messageFilterParams,
        doesContain: {
          ...doesContain,
          pattern: value
        }
      }
    });
  }

  setMessageDoesContainIsRegex({ target: { checked } }) {
    const { messageFilterParams } = this.state;
    const { doesContain } = messageFilterParams;
    this.setState({
      messageFilterParams: {
        ...messageFilterParams,
        doesContain: {
          ...doesContain,
          isRegex: checked
        }
      }
    });
  }

  setMessageDoesNotContainPattern({ target: { value } }) {
    const { messageFilterParams } = this.state;
    const { doesNotContain } = messageFilterParams;
    this.setState({
      messageFilterParams: {
        ...messageFilterParams,
        doesNotContain: {
          ...doesNotContain,
          pattern: value
        }
      }
    });
  }

  setNidDoesContainPattern({ target: { value } }) {
    const { nidFilterParams } = this.state;
    const { doesContain } = nidFilterParams;
    this.setState({
      nidFilterParams: {
        ...nidFilterParams,
        doesContain: {
          ...doesContain,
          pattern: value
        }
      }
    });
  }

  setNidDoesContainIsRegex({ target: { checked } }) {
    const { nidFilterParams } = this.state;
    const { doesContain } = nidFilterParams;
    this.setState({
      nidFilterParams: {
        ...nidFilterParams,
        doesContain: {
          ...doesContain,
          isRegex: checked
        }
      }
    });
  }

  setNidDoesNotContainPattern({ target: { value } }) {
    const { nidFilterParams } = this.state;
    const { doesNotContain } = nidFilterParams;
    this.setState({
      nidFilterParams: {
        ...nidFilterParams,
        doesNotContain: {
          ...doesNotContain,
          pattern: value
        }
      }
    });
  }

  logFilter({ nid, message }) {
    const {
      messageFilterParams: {
        doesContain: messageDoesContain,
        doesNotContain: messageDoesNotContain
      },
      nidFilterParams: {
        doesContain: nidDoesContain,
        doesNotContain: nidDoesNotContain
      },
      nodeFilterPrograms,
      nodeFilterNodes
    } = this.state;
    const { nodePrograms } = this.props;
    if (messageDoesContain.pattern.length > 0) {
      if (messageDoesContain.isRegex) {
        try {
          if (!message.match(new RegExp(messageDoesContain.pattern)))
            return false;
        } catch (err) {}
      } else {
        if (!message.contains(messageDoesContain.pattern)) return false;
      }
    }
    if (messageDoesNotContain.pattern.length > 0) {
      if (message.contains(messageDoesNotContain.pattern)) return false;
    }
    if (nodeFilterPrograms.length > 0) {
      if (!nodeFilterPrograms.contains(nodePrograms[nid])) return false;
    }
    if (nodeFilterNodes.length > 0) {
      if (!nodeFilterNodes.contains(nid)) return false;
    }
    if (nidDoesContain.pattern.length > 0) {
      if (nidDoesContain.isRegex) {
        try {
          if (!message.match(new RegExp(nidDoesContain.pattern))) return false;
        } catch (err) {}
      } else {
        if (!message.contains(nidDoesContain.pattern)) return false;
      }
    }
    if (nidDoesNotContain.pattern.length > 0) {
      if (message.contains(nidDoesNotContain.pattern)) return false;
    }
    return true;
  }

  render() {
    const { simulationLogs, nodeColours, programNames, nodeNids } = this.props;
    return (
      <Fragment>
        <div
          data-role="accordion"
          data-one-frame={false}
          data-show-active={true}
          className="mt-3 mb-3"
        >
          <div className="frame border bd-lightGray active">
            <div className="heading">
              <h5>Filtering</h5>
            </div>
            <div className="content">
              <div className="border-bottom bd-lightGray ml-2 mr-2 pt-2 pb-2 mb-2">
                <h6>Output message</h6>
                <div className="grid">
                  <div className="row mt-2 mb-2">
                    <div className="cell-10">
                      <input
                        type="text"
                        data-role="input"
                        data-prepend="Contains: "
                        data-clear-button={false}
                        onChange={this.setMessageDoesContainPattern}
                      />
                    </div>
                    <div className="cell-2">
                      <input
                        type="checkbox"
                        data-role="checkbox"
                        data-caption="Regex?"
                        onChange={this.setMessageDoesContainIsRegex}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="cell-12">
                      <input
                        type="text"
                        data-role="input"
                        data-prepend="Does not contain: "
                        data-clear-button={false}
                        onChange={this.setMessageDoesNotContainPattern}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-bottom bd-lightGray ml-2 mr-2 pt-2 pb-2 mb-2">
                <h6>Node</h6>
                <div className="grid">
                  <div className="row mt-2">
                    <div className="cell-md-6" key={programNames}>
                      <p>Program:</p>
                      <select
                        data-role="select"
                        multiple
                        data-on-change={onChangeOutputViewerProgramFilter}
                      >
                        {programNames.map(program => (
                          <option value={program}>{program}</option>
                        ))}
                      </select>
                    </div>
                    <div className="cell-md-6" key={nodeNids}>
                      <p>Select nodes:</p>
                      <select
                        data-role="select"
                        multiple
                        data-on-change={onChangeOutputViewerNodeFilter}
                      >
                        {nodeNids.map(nid => (
                          <option value={nid}>{nid}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="cell-10">
                      <input
                        type="text"
                        data-role="input"
                        data-prepend="Nid contains: "
                        data-clear-button={false}
                        onChange={this.setNidDoesContainPattern}
                      />
                    </div>
                    <div className="cell-2">
                      <input
                        type="checkbox"
                        data-role="checkbox"
                        data-caption="Regex?"
                        onChange={this.setNidDoesContainIsRegex}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="cell-12">
                      <input
                        type="text"
                        data-role="input"
                        data-prepend="Nid does not contain: "
                        data-clear-button={false}
                        onChange={this.setNidDoesNotContainPattern}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  p: pPropType.isRequired,
  nodeColours: PropTypes.objectOf(PropTypes.string).isRequired,
  simulationLogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  programNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  nodePrograms: PropTypes.objectOf(PropTypes.string).isRequired,
  nodeNids: PropTypes.arrayOf(PropTypes.string).isRequired
};

function mapStateToProps(state) {
  return {
    p: getP(state),
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
    programNames: selectPrograms(state).map(({ name }) => name),
    nodePrograms: selectSimulationNodes(state).reduce(
      (accPrograms, { nid, program }) => ({ ...accPrograms, [nid]: program }),
      {}
    ),
    nodeNids: selectSimulationNodes(state).map(({ nid }) => nid)
  };
}

export default connect(mapStateToProps)(OutputViewer);
