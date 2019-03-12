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
  selectCustomisation,
  selectNetworkTopology
} from "../../reduxStore/selectors";
import { onChangeNetworkTopologyLanguage } from "../../styleConstants";
import {
  setNetworkTopologyLanguage,
  setRawNetworkTopology
} from "../../reduxStore/networkTopology/reducer";

import "brace/theme/tomorrow";
import "brace/theme/monokai";

import "brace/mode/yaml";
import "brace/mode/json";
import MetroIcon from "../MetroIcon";
import { saveNetworkTopology } from "../../HTTPServer";

class NetworkTopology extends Component {
  constructor(props) {
    super(props);
    const { savedRawNetworkTopology, savedLanguage } = props;
    this.state = {
      language: savedLanguage,
      rawNetworkTopology: savedRawNetworkTopology
    };
    window[onChangeNetworkTopologyLanguage] = this.setLanguage.bind(this);
    this.setRawNetworkTopology = this.setRawNetworkTopology.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
    this.isNetworkTopologyChanged = this.isNetworkTopologyChanged.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.revertChanges = this.revertChanges.bind(this);
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

  saveChanges() {
    const { language, rawNetworkTopology } = this.state;
    saveNetworkTopology(rawNetworkTopology, language);
    // TODO: perform validation
    const { dispatch } = this.props;
    dispatch(setNetworkTopologyLanguage(language));
    dispatch(setRawNetworkTopology(rawNetworkTopology));
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
    const { rawNetworkTopology, language } = this.state;
    return (
      <Fragment>
        <span className={"display1"}>{p.tc("networkTopology")}</span>
        <div className="border bd-lightGray border-size-2 p-4 mt-6">
          <div key={language}>
            <h6>Language</h6>
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
          <div className="mt-4">
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
                <button className="button primary" onClick={this.saveChanges}>
                  <MetroIcon icon={"floppy-disk"} /> {p.tc("save")}
                </button>
                <button className="button yellow" onClick={this.revertChanges}>
                  <MetroIcon icon={"undo"} /> {p.tc("revert")}
                </button>
              </Fragment>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

NetworkTopology.propTypes = {
  p: pPropType.isRequired,
  colourScheme: PropTypes.string.isRequired,
  savedLanguage: PropTypes.string.isRequired,
  savedRawNetworkTopology: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    p: getP(state),
    colourScheme: selectCustomisation(state).colourScheme,
    savedRawNetworkTopology: selectNetworkTopology(state).rawNetworkTopology,
    savedLanguage: selectNetworkTopology(state).language
  };
}

export default connect(mapStateToProps)(NetworkTopology);
