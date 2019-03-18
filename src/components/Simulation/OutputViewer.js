import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getP } from "redux-polyglot";
import { pPropType } from "../../customPropTypes";
import {
  selectSimulationLogs,
  selectSimulationNodes
} from "../../reduxStore/selectors";
import DateTime from "../common/DateTime";

class OutputViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageFilterParams: {
        doesContain: { pattern: "", isRegex: false },
        doesNotContain: { pattern: "", isRegex: false }
      }
    };

    this.setDoesContainPattern = this.setDoesContainPattern.bind(this);
    this.setDoesNotContainPattern = this.setDoesNotContainPattern.bind(this);
    this.setDoesContainIsRegex = this.setDoesContainIsRegex.bind(this);
    this.setDoesNotContainIsRegex = this.setDoesNotContainIsRegex.bind(this);
    this.logFilter = this.logFilter.bind(this);
  }

  setDoesContainPattern({ target: { value } }) {
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

  setDoesContainIsRegex({ target: { checked } }) {
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

  setDoesNotContainPattern({ target: { value } }) {
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

  setDoesNotContainIsRegex({ target: { checked } }) {
    const { messageFilterParams } = this.state;
    const { doesNotContain } = messageFilterParams;
    this.setState({
      messageFilterParams: {
        ...messageFilterParams,
        doesNotContain: {
          ...doesNotContain,
          isRegex: checked
        }
      }
    });
  }

  logFilter({ nid, message, timestamp }) {
    const {
      messageFilterParams: { doesContain, doesNotContain }
    } = this.state;
    if (doesContain.pattern.length !== 0) {
      if (doesContain.isRegex) {
        try {
          if (!message.match(new RegExp(doesContain.pattern))) return false;
        } catch (err) {}
      } else {
        if (!message.contains(doesContain.pattern)) return false;
      }
    }
    if (doesNotContain.pattern.length !== 0) {
      if (message.contains(doesNotContain.pattern)) return false;
    }
    return true;
  }

  render() {
    const { simulationLogs, nodeColours } = this.props;
    return (
      <Fragment>
        <div
          data-role="accordion"
          data-one-frame={false}
          data-show-active={false}
          className="mt-3 mb-3"
        >
          <div className="frame border bd-lightGray">
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
                        onChange={this.setDoesContainPattern}
                      />
                    </div>
                    <div className="cell-2">
                      <input
                        type="checkbox"
                        data-role="checkbox"
                        data-caption="Regex?"
                        onChange={this.setDoesContainIsRegex}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="cell-10">
                      <input
                        type="text"
                        data-role="input"
                        data-prepend="Does not contain: "
                        data-clear-button={false}
                        onChange={this.setDoesNotContainPattern}
                      />
                    </div>
                    <div className="cell-2">
                      {" "}
                      <input
                        type="checkbox"
                        data-role="checkbox"
                        data-caption="Regex?"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                  style={{ backgroundColor: nodeColours[nid] }}
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
  simulationLogs: PropTypes.arrayOf(PropTypes.object).isRequired
};

function mapStateToProps(state) {
  return {
    p: getP(state),
    nodeColours: selectSimulationNodes(state).reduce(
      (accColours, { nid, loggingColour }) => {
        accColours[nid] = loggingColour;
        return accColours;
      },
      {}
    ),
    simulationLogs: selectSimulationLogs(state).sort(
      ({ timestamp: a }, { timestamp: b }) => (a < b ? -1 : a > b ? 1 : 0)
    )
  };
}

export default connect(mapStateToProps)(OutputViewer);
