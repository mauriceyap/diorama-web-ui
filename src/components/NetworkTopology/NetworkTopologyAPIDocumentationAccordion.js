import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MetroIcon from "../MetroIcon";
import Markdown from "react-markdown";
import { getLocale, getP } from "redux-polyglot";
import { pPropType } from "../../customPropTypes";
import mdDocs from "../Documentation/mdDocs";

class NetworkTopologyAPIDocumentationAccordion extends Component {
  constructor(props) {
    super(props);
    this.fetchMdContent = this.fetchMdContent.bind(this);
    this.state = { mdContent: "Loading..." };
    this.fetchMdContent();
  }

  fetchMdContent() {
    const { locale, language } = this.props;
    fetch(mdDocs[locale]["network"][language])
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
            {p.tc("networkTopology.networkTopologyAPIDocumentation")}
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
    const { locale: prevLocale, language: prevLanguage } = prevProps;
    const { locale, language } = this.props;
    if (locale !== prevLocale || language !== prevLanguage) {
      this.fetchMdContent();
    }
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
