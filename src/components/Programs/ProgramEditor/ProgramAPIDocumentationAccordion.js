import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLocale, getP } from "redux-polyglot";
import { pPropType } from "../../../customPropTypes";
import Markdown from "react-markdown";

import en_gb_python3 from "../../../userDocs/en_gb/nodeProgramAPI/python3.md";
import MetroIcon from "../../MetroIcon";

const mdDocs = {
  "en-gb": {
    python3: en_gb_python3
  }
};

class ProgramAPIDocumentationAccordion extends Component {
  constructor(props) {
    super(props);
    const { runtime, locale } = props;

    this.state = { mdContent: "" };
    fetch(mdDocs[locale][runtime])
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
            {p.tc("programAPIDocumentation")}
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

ProgramAPIDocumentationAccordion.propTypes = {
  runtime: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  p: pPropType.isRequired
};

function mapStateToProps(state) {
  return {
    p: getP(state),
    locale: getLocale(state)
  };
}

export default connect(mapStateToProps)(ProgramAPIDocumentationAccordion);
