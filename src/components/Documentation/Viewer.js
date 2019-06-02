import React, { Component } from "react";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { pPropType } from "../../customPropTypes";
import { getLocale, getP } from "redux-polyglot";

import enGbProgramPython3 from "../../userDocs/en_gb/nodeProgramAPI/python3.md";
import enGbNetworkJSON from "../../userDocs/en_gb/networkTopologyAPI/JSON.md";
import enGbNetworkYAML from "../../userDocs/en_gb/networkTopologyAPI/YAML.md";

const mdDocs = {
  "en-gb": {
    program: { python3: enGbProgramPython3 },
    network: { JSON: enGbNetworkJSON, YAML: enGbNetworkYAML }
  }
};

class Viewer extends Component {
  constructor(props) {
    super(props);
    const {
      locale,
      match: {
        params: { interfaceLanguage }
      }
    } = this.props;
    const api = interfaceLanguage.split("-")[0];
    const language = interfaceLanguage.split("-")[1];
    this.state = { mdContent: "" };
    fetch(mdDocs[locale][api][language])
      .then(res => res.text())
      .then(mdContent => this.setState({ mdContent }));
  }

  render() {
    const { mdContent } = this.state;
    return (
      <div>
        <p>
          <Link to={"/docs"}>{"< "}Back to documentation</Link>
        </p>
        <Markdown source={mdContent} />
      </div>
    );
  }
}

Viewer.propTypes = {
  language: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  p: pPropType.isRequired
};

function mapStateToProps(state) {
  return {
    p: getP(state),
    locale: getLocale(state)
  };
}

export default connect(mapStateToProps)(Viewer);
