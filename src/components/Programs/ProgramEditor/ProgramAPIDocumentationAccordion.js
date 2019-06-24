import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLocale, getP } from "redux-polyglot";
import { pPropType } from "../../../customPropTypes";
import Markdown from "react-markdown";
import MetroIcon from "../../MetroIcon";
import mdDocs from "../../Documentation/mdDocs";

class ProgramAPIDocumentationAccordion extends Component {
  constructor(props) {
    super(props);
    this.fetchMdContent = this.fetchMdContent.bind(this);
    this.state = { mdContent: "Loading..." };
    this.fetchMdContent();
  }

  fetchMdContent() {
    const { locale, runtime } = this.props;
    fetch(mdDocs[locale]["program"][runtime])
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
            <strong>{p.tc("programs.programAPIDocumentation")}</strong>
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

  componentDidUpdate(prevProps) {
    const { locale: prevLocale, runtime: prevRuntime } = prevProps;
    const { locale, runtime } = this.props;
    if (locale !== prevLocale || runtime !== prevRuntime) {
      this.fetchMdContent();
    }
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
