import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { pPropType } from "../../customPropTypes";
import { getP } from "redux-polyglot";
import { connect } from "react-redux";
import { braceEditorModes } from "./constants";
import AceEditor from "react-ace";
import { topologyLanguages } from "./constants";
import colours from "../../customisation/colours";
import {
  selectCustomConfig,
  selectCustomisation,
  selectNetworkTopology
} from "../../reduxStore/selectors";
import {
  onChangeNetworkTopologyLanguage,
  toastTimeout
} from "../../styleConstants";
import {
  setUnpackedNetworkTopology,
  setNetworkTopologyLanguage,
  setRawNetworkTopology
} from "../../reduxStore/networkTopology/reducer";
import Socket from "../../Socket";
import SocketEvents from "../../SocketEvents";
import NetworkTopologyAPIDocumentationAccordion from "./NetworkTopologyAPIDocumentationAccordion";

import "brace/theme/tomorrow";
import "brace/theme/monokai";

import "brace/mode/yaml";
import "brace/mode/json";
import MetroIcon from "../MetroIcon";
import { saveNetworkTopology } from "../../HTTPServer";
import { noop } from "../../utils";
import Metro from "metro4";
import { getErrorDisplayMessage } from "./errors";
import NetworkTopologyViewer from "../NetworkTopologyViewer";
import { setConnectionParameters } from "../../reduxStore/connectionParameters/reducer";

class NetworkTopology extends Component {
  constructor(props) {
    super(props);
    const {
      savedRawNetworkTopology,
      savedLanguage,
      customConfig: { selfConnectedNodes }
    } = props;
    this.state = {
      language: savedLanguage,
      rawNetworkTopology: savedRawNetworkTopology,
      selfConnectedNodes
    };
    Socket.send(SocketEvents.GET_RAW_NETWORK_TOPOLOGY);
    window[onChangeNetworkTopologyLanguage] = this.setLanguage.bind(this);
    this.setRawNetworkTopology = this.setRawNetworkTopology.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
    this.isNetworkTopologyChanged = this.isNetworkTopologyChanged.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.revertChanges = this.revertChanges.bind(this);
    this.setSelfConnectedNodes = this.setSelfConnectedNodes.bind(this);
    this.onSaveChangesResponse = this.onSaveChangesResponse.bind(this);
  }

  isNetworkTopologyChanged() {
    const { language, rawNetworkTopology } = this.state;
    const { savedLanguage, savedRawNetworkTopology } = this.props;
    return (
      savedLanguage !== language ||
      savedRawNetworkTopology !== rawNetworkTopology
    );
  }

  setLanguage(languageArray) {
    this.setState({ language: languageArray[0] });
  }

  setRawNetworkTopology(rawNetworkTopology) {
    this.setState({ rawNetworkTopology });
  }

  setSelfConnectedNodes({ target: { checked } }) {
    const { customConfig } = this.props;
    Socket.send(SocketEvents.SET_CUSTOM_CONFIG, {
      ...customConfig,
      selfConnectedNodes: checked
    });
    Socket.send(SocketEvents.GET_CUSTOM_CONFIG);
    Socket.send(SocketEvents.GET_CONNECTION_PARAMETERS);
  }

  onSaveChangesResponse(response) {
    const { language, rawNetworkTopology } = this.state;
    const { dispatch, p } = this.props;
    response
      .json()
      .then(data => {
        const { isValidAndSaved } = data;
        if (isValidAndSaved) {
          const { unpackedTopology, connectionParameters } = data;
          dispatch(setNetworkTopologyLanguage(language));
          dispatch(setRawNetworkTopology(rawNetworkTopology));
          dispatch(setUnpackedNetworkTopology(unpackedTopology));
          dispatch(setConnectionParameters(connectionParameters));
          Metro.toast.create(
            p.t("networkTopology.topologySaved"),
            noop,
            toastTimeout,
            "success",
            {
              showTop: true
            }
          );
        } else {
          const { errorMessage, errorData } = data;
          Metro.toast.create(
            getErrorDisplayMessage(errorMessage, errorData, p),
            noop,
            toastTimeout,
            "alert",
            {
              showTop: true
            }
          );
        }
      })
      .catch(e => console.error(e));
  }

  saveChanges() {
    const { language, rawNetworkTopology } = this.state;
    saveNetworkTopology(
      rawNetworkTopology,
      language,
      this.onSaveChangesResponse,
      noop
    );
  }

  revertChanges() {
    const { savedLanguage, savedRawNetworkTopology } = this.props;
    this.setState({
      language: savedLanguage,
      rawNetworkTopology: savedRawNetworkTopology
    });
  }

  render() {
    const { p, colourScheme } = this.props;
    const { rawNetworkTopology, language, selfConnectedNodes } = this.state;
    return (
      <Fragment>
        <span className={"display1"}>
          {p.tc("networkTopology.networkTopology")}
        </span>
        <div className="mt-6">
          <NetworkTopologyAPIDocumentationAccordion
            language={language}
            key={language}
          />
        </div>
        <div className="border bd-lightGray border-size-2 p-4 mt-6">
          <div className="row">
            <div key={language} className="cell-md-6">
              <h6>{p.tc("networkTopology.language")}</h6>
              <select
                data-role="select"
                defaultValue={language}
                data-on-change={onChangeNetworkTopologyLanguage}
              >
                {topologyLanguages.map(l => (
                  <option value={l} key={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 cell-md-6" key={selfConnectedNodes}>
              <h6>{p.tc("networkTopology.selfConnectedNodes")}</h6>
              <p>
                {selfConnectedNodes
                  ? p.t("networkTopology.isSelfConnected")
                  : p.t("networkTopology.isNotSelfConnected")}
              </p>
              <input
                type="checkbox"
                data-role="switch"
                data-material="true"
                checked={selfConnectedNodes}
                onChange={this.setSelfConnectedNodes}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="cell-md-6">
              <div>
                <AceEditor
                  name={"networkTopologyEditor"}
                  theme={colours.aceEditorTheme[colourScheme]}
                  mode={braceEditorModes[language]}
                  value={rawNetworkTopology}
                  onChange={this.setRawNetworkTopology}
                  width={"100%"}
                  editorProps={{
                    $blockScrolling: Infinity
                  }}
                />
              </div>
              <div className="mt-4">
                {this.isNetworkTopologyChanged() && (
                  <Fragment>
                    <button
                      className="button primary"
                      onClick={this.saveChanges}
                    >
                      <MetroIcon icon={"floppy-disk"} /> {p.tc("common.save")}
                    </button>
                    <button
                      className="button yellow"
                      onClick={this.revertChanges}
                    >
                      <MetroIcon icon={"undo"} /> {p.tc("common.revert")}
                    </button>
                  </Fragment>
                )}
              </div>
            </div>
            <div className="cell-md-6">
              <p>
                <b>{p.t("networkTopology.doubleClickInformation")}</b>
              </p>
              <NetworkTopologyViewer height={500} />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  componentDidMount() {
    const { p } = this.props;
    document.title = `Diorama - ${p.tc("networkTopology.networkTopology")}`;
  }

  componentDidUpdate(prevProps) {
    const { language } = this.state;
    const {
      savedLanguage,
      savedRawNetworkTopology,
      customConfig: { selfConnectedNodes }
    } = this.props;
    const {
      savedLanguage: prevSavedLanguage,
      savedRawNetworkTopology: prevSavedRawNetworkTopology,
      customConfig: { selfConnectedNodes: prevSelfConnectedNodes }
    } = prevProps;

    if (selfConnectedNodes !== prevSelfConnectedNodes) {
      this.setState({ selfConnectedNodes });
    }

    if (language === prevSavedLanguage && savedLanguage !== prevSavedLanguage) {
      this.setState({ language: savedLanguage });
    }

    if (savedRawNetworkTopology !== prevSavedRawNetworkTopology) {
      this.setState({ rawNetworkTopology: savedRawNetworkTopology });
    }
  }
}

NetworkTopology.propTypes = {
  p: pPropType.isRequired,
  colourScheme: PropTypes.string.isRequired,
  savedLanguage: PropTypes.string.isRequired,
  savedRawNetworkTopology: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  customConfig: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    p: getP(state),
    colourScheme: selectCustomisation(state).colourScheme,
    savedRawNetworkTopology: selectNetworkTopology(state).rawNetworkTopology,
    savedLanguage: selectNetworkTopology(state).language,
    customConfig: selectCustomConfig(state)
  };
}

export default connect(mapStateToProps)(NetworkTopology);
