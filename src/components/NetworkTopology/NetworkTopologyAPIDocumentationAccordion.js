import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MetroIcon from "../MetroIcon";
import Markdown from "react-markdown";
import { getLocale, getP } from "redux-polyglot";
import { pPropType } from "../../customPropTypes";
import YAML from "../../userDocs/en_gb/networkTopologyAPI/YAML.md";
import JSONDoc from "../../userDocs/en_gb/networkTopologyAPI/JSON.md";

const mdDocs = {
  "en-gb": {
    YAML,
    JSON: JSONDoc
  }
};

class NetworkTopologyAPIDocumentationAccordion extends Component {
  constructor(props) {
    super(props);
    const { language, locale } = props;

    this.state = { mdContent: "" };
    fetch(mdDocs[locale][language])
      .then(res => res.text())
      .then(mdContent => this.setState({ mdContent }));
  }

  render() {
    const { p } = this.props;
    const { mdContent } = this.state;
    return (
      <div
        data-role="accordion"
        data-one-frame="false"
        data-show-active="false"
      >
        <div className="frame">
          <div className="heading bg-lightGray">
            <MetroIcon icon={"info"} colour={"black"} />{" "}
            {p.tc("networkTopologyAPIDocumentation")}
          </div>
          <div className="content">
            <div className="border bd-lightGray border-size-2 p-4">
              <Markdown source={mdContent} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NetworkTopologyAPIDocumentationAccordion.propTypes = {
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

export default connect(mapStateToProps)(
  NetworkTopologyAPIDocumentationAccordion
);
