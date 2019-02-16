import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

import colours from "../customisation/colours";
import { selectCustomisation } from "../reduxStore/selectors";
import AppBar from "./AppBar";
import SideNav from "./SideNav";
import PreferencesDialog from "./PreferencesDialog";
import Programs from "./Programs";
import ProjectHome from "./ProjectHome";
import startupActions from "../startupActions";

class Diorama extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    startupActions(dispatch);
  }

  render() {
    const { colourScheme } = this.props;
    const sideBarWrapperClassName = classnames(
      "pt-16",
      `bg-${colours.sideNavBackground[colourScheme]}`,
      `fg-${colours.sideNavForeground[colourScheme]}`
    );
    return (
      <Router>
        <Fragment>
          <AppBar />
          <div style={{ width: "100%", minHeight: "100vh", display: "flex" }}>
            <div className={sideBarWrapperClassName}>
              <SideNav />
            </div>
            <div className={"pt-16"} style={{ width: "100%" }}>
              <div className={"container"}>
                <Route exact path={"/"} component={ProjectHome} />
                <Route path={"/programs"} component={Programs} />
              </div>
            </div>
          </div>
          <PreferencesDialog />
        </Fragment>
      </Router>
    );
  }
}

Diorama.propTypes = {
  colourScheme: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    colourScheme: selectCustomisation(state).colourScheme
  };
}

export default connect(mapStateToProps)(Diorama);
