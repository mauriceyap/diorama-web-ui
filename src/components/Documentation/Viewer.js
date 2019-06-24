import React, { Component } from "react";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { pPropType } from "../../customPropTypes";
import { getLocale, getP } from "redux-polyglot";

import mdDocs from "./mdDocs";

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.fetchMdContent = this.fetchMdContent.bind(this);
    this.state = { mdContent: "Loading..." };
    this.fetchMdContent();
  }

  fetchMdContent() {
    const {
      locale,
      match: {
        params: { interfaceLanguage }
      }
    } = this.props;
    const api = interfaceLanguage.split("-")[0];
    const language = interfaceLanguage.split("-")[1];
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

  componentDidUpdate(prevProps) {
    const { locale: prevLocale } = prevProps;
    const { locale } = this.props;
    if (locale !== prevLocale) {
      this.fetchMdContent();
    }
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
