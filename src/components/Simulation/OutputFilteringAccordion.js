import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  onChangeOutputViewerNodeFilter,
  onChangeOutputViewerProgramFilter
} from "../../styleConstants";
import {
  selectPrograms,
  selectSimulationNodes
} from "../../reduxStore/selectors";
import {
  setMessageDoesContainIsRegex,
  setMessageDoesContainPattern,
  setMessageDoesNotContainPattern,
  setNidDoesContainIsRegex,
  setNidDoesContainPattern,
  setNidDoesNotContainPattern,
  setNodeNids,
  setNodePrograms
} from "../../reduxStore/simulationLogsFilter/reducer";

class OutputFilteringAccordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageDoesContainPattern: "",
      messageDoesContainIsRegex: false,
      messageDoesNotContainPattern: "",
      nidDoesContainPattern: "",
      nidDoesContainIsRegex: false,
      nidDoesNotContainPattern: "",
      nodePrograms: [],
      nodeNids: []
    };
    const { dispatchSetNodePrograms, dispatchSetNodeNids } = props;
    window[onChangeOutputViewerProgramFilter] = dispatchSetNodePrograms;
    window[onChangeOutputViewerNodeFilter] = dispatchSetNodeNids;
  }

  render() {
    const {
      programNames,
      nodeNids,
      dispatchSetMessageDoesContainPattern,
      dispatchSetMessageDoesContainIsRegex,
      dispatchSetMessageDoesNotContainPattern,
      dispatchSetNidDoesContainPattern,
      dispatchSetNidDoesContainIsRegex,
      dispatchSetNidDoesNotContainPattern
    } = this.props;
    return (
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
                      onChange={dispatchSetMessageDoesContainPattern}
                    />
                  </div>
                  <div className="cell-2">
                    <input
                      type="checkbox"
                      data-role="checkbox"
                      data-caption="Regex?"
                      onChange={dispatchSetMessageDoesContainIsRegex}
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
                      onChange={dispatchSetMessageDoesNotContainPattern}
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
                        <option value={program} key={program}>
                          {program}
                        </option>
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
                        <option value={nid} key={nid}>
                          {nid}
                        </option>
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
                      onChange={dispatchSetNidDoesContainPattern}
                    />
                  </div>
                  <div className="cell-2">
                    <input
                      type="checkbox"
                      data-role="checkbox"
                      data-caption="Regex?"
                      onChange={dispatchSetNidDoesContainIsRegex}
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
                      onChange={dispatchSetNidDoesNotContainPattern}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

OutputFilteringAccordion.propTypes = {
  programNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  nodeNids: PropTypes.arrayOf(PropTypes.string).isRequired,
  programForNode: PropTypes.objectOf(PropTypes.string).isRequired,
  dispatchSetMessageDoesContainPattern: PropTypes.func.isRequired,
  dispatchSetMessageDoesContainIsRegex: PropTypes.func.isRequired,
  dispatchSetMessageDoesNotContainPattern: PropTypes.func.isRequired,
  dispatchSetNidDoesContainPattern: PropTypes.func.isRequired,
  dispatchSetNidDoesContainIsRegex: PropTypes.func.isRequired,
  dispatchSetNidDoesNotContainPattern: PropTypes.func.isRequired,
  dispatchSetNodePrograms: PropTypes.func.isRequired,
  dispatchSetNodeNids: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    dispatchSetMessageDoesContainPattern({ target: { value } }) {
      dispatch(setMessageDoesContainPattern(value));
    },
    dispatchSetMessageDoesContainIsRegex({ target: { checked } }) {
      dispatch(setMessageDoesContainIsRegex(checked));
    },
    dispatchSetMessageDoesNotContainPattern({ target: { value } }) {
      dispatch(setMessageDoesNotContainPattern(value));
    },
    dispatchSetNidDoesContainPattern({ target: { value } }) {
      dispatch(setNidDoesContainPattern(value));
    },
    dispatchSetNidDoesContainIsRegex({ target: { checked } }) {
      dispatch(setNidDoesContainIsRegex(checked));
    },
    dispatchSetNidDoesNotContainPattern({ target: { value } }) {
      dispatch(setNidDoesNotContainPattern(value));
    },
    dispatchSetNodePrograms(selectedPrograms) {
      dispatch(setNodePrograms(selectedPrograms));
    },
    dispatchSetNodeNids(selectedNids) {
      dispatch(setNodeNids(selectedNids));
    }
  };
}

function mapStateToProps(state) {
  return {
    programNames: selectPrograms(state).map(({ name }) => name),
    nodeNids: selectSimulationNodes(state).map(({ nid }) => nid),
    programForNode: selectSimulationNodes(state).reduce(
      (accPrograms, { nid, program }) => ({ ...accPrograms, [nid]: program }),
      {}
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OutputFilteringAccordion);
