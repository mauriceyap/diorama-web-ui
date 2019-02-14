import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

import colours from "../styling/colours";
import { selectTheme } from "../reduxStore/selectors";
import AppBar from "./AppBar";
import SideNav from "./SideNav";
import PreferencesDialog from "./PreferencesDialog";
import Programs from "./Programs";
import ProjectHome from "./ProjectHome";

class Diorama extends Component {
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
    colourScheme: selectTheme(state).colourScheme
  };
}

export default connect(mapStateToProps)(Diorama);
