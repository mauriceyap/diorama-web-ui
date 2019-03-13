import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { selectCustomConfig } from "../../reduxStore/selectors";
import { getP } from "redux-polyglot";
import { pPropType } from "../../customPropTypes";
import MetroIcon from "../MetroIcon";
import { setCustomConfig } from "../../reduxStore/customConfig/reducer";
import SocketEvents from "../../SocketEvents";
import Socket from "../../Socket";

class CustomConfig extends Component {
  constructor(props) {
    super(props);
    const { customConfig } = props;
    this.state = { editingState: { ...customConfig }, formElementKey: false };
    this.isCustomConfigChanged = this.isCustomConfigChanged.bind(this);
    this.setEditingStateValue = this.setEditingStateValue.bind(this);
    this.setBaseIpAddress = this.setBaseIpAddress.bind(this);
    this.setNetworkSubnet = this.setNetworkSubnet.bind(this);
    this.setBasePort = this.setBasePort.bind(this);
    this.setSelfConnectedNodes = this.setSelfConnectedNodes.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.revertChanges = this.revertChanges.bind(this);
  }

  isCustomConfigChanged() {
    const { customConfig } = this.props;
    const { editingState } = this.state;
    return [...Object.keys(customConfig), ...Object.keys(editingState)]
      .unique()
      .some(key => customConfig[key] !== editingState[key]);
  }

  setEditingStateValue(key, value) {
    const { editingState } = this.state;
    this.setState({
      editingState: { ...editingState, [key]: value }
    });
  }

  setBaseIpAddress({ target: { value } }) {
    this.setEditingStateValue("baseIpAddress", value);
  }

  setNetworkSubnet({ target: { value } }) {
    this.setEditingStateValue("networkSubnet", value);
  }

  setBasePort({ target: { value } }) {
    this.setEditingStateValue("basePort", value);
  }

  setSelfConnectedNodes({ target: { checked } }) {
    this.setEditingStateValue("selfConnectedNodes", checked);
  }

  saveChanges() {
    const { dispatch } = this.props;
    const { editingState } = this.state;
    Socket.send(SocketEvents.SET_CUSTOM_CONFIG, editingState);
    dispatch(setCustomConfig(editingState));
  }

  revertChanges() {
    const { customConfig } = this.props;
    const { formElementKey } = this.state;
    this.setState({
      editingState: { ...customConfig },
      formElementKey: !formElementKey
    });
    this.forceUpdate();
  }

  render() {
    const { p, customConfig } = this.props;
    const { editingState, formElementKey } = this.state;
    // TODO: descriptions about each thing, validation
    return (
      <Fragment>
        <span className={"display1"}>{p.tc("customConfig")}</span>
        <div
          className="border bd-lightGray border-size-2 p-4 mt-6"
          key={formElementKey}
        >
          <div key={editingState.selfConnectedNodes}>
            <h6>{p.tc("selfConnectedNodes")}</h6>
            <p>what does this mean?</p>
            <p>
              {editingState.selfConnectedNodes
                ? "nodes are connected to themselves"
                : "nodes are not connected to themselves"}
            </p>
            <input
              type="checkbox"
              data-role="switch"
              data-material="true"
              checked={editingState.selfConnectedNodes}
              onChange={this.setSelfConnectedNodes}
            />
          </div>
          <div className="mt-6">
            <h6>{p.tc("baseIpAddress")}</h6>
            <p>something about base ip</p>
            <input
              type="text"
              data-role="input"
              data-default-value={customConfig.baseIpAddress}
              onChange={this.setBaseIpAddress}
            />
          </div>
          <div className="mt-6">
            <h6>{p.tc("networkSubnet")}</h6>
            <p>something about network subnet</p>
            <input
              type="text"
              data-role="input"
              data-default-value={customConfig.networkSubnet}
              onChange={this.setNetworkSubnet}
            />
          </div>
          <div className="mt-6">
            <h6>{p.tc("basePort")}</h6>
            <p>something about base port</p>
            <input
              type="number"
              data-role="input"
              data-default-value={customConfig.basePort}
              onChange={this.setBasePort}
            />
          </div>
          {this.isCustomConfigChanged() && (
            <Fragment>
              <button className="button primary" onClick={this.saveChanges}>
                <MetroIcon icon={"floppy-disk"} /> {p.tc("save")}
              </button>
              <button className="button yellow" onClick={this.revertChanges}>
                <MetroIcon icon={"undo"} /> {p.tc("revert")}
              </button>
            </Fragment>
          )}
        </div>
      </Fragment>
    );
  }

  componentDidUpdate() {
    // TODO: when stuff updated through socket
  }
}

CustomConfig.propTypes = {
  dispatch: PropTypes.func.isRequired,
  p: pPropType.isRequired,
  customConfig: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    customConfig: selectCustomConfig(state),
    p: getP(state)
  };
}

export default connect(mapStateToProps)(CustomConfig);
