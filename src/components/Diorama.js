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
import ProgramEditor from "./Programs/ProgramEditor";
import NetworkTopology from "./NetworkTopology";
import CustomConfig from "./CustomConfig";
import Simulation from "./Simulation";
import startupActions from "../startupActions";
import {
  shrunkSideBarWidth,
  sideBarShrinkScreenWidth,
  sideBarWidth
} from "../styleConstants";
import { isScreenWidthGreaterThan } from "../utils";
import ConnectionParametersEditorDialog from "./NetworkTopologyViewer/ConnectionParametersEditorDialog";

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
            <div
              className={sideBarWrapperClassName}
              style={{ position: "fixed", height: "100%" }}
            >
              <SideNav />
            </div>
            <div
              className={"pt-16"}
              style={{
                width: "100%",
                marginLeft: isScreenWidthGreaterThan(sideBarShrinkScreenWidth)
                  ? sideBarWidth
                  : shrunkSideBarWidth
              }}
            >
              <div className={"container"} style={{ maxWidth: "none" }}>
                <Route exact path={"/"} component={ProjectHome} />
                <Route exact path={"/programs"} component={Programs} />
                <Route
                  path={"/programs/:programName"}
                  component={ProgramEditor}
                />
                <Route
                  exact
                  path={"/network-topology"}
                  component={NetworkTopology}
                />
                <Route exact path={"/custom-config"} component={CustomConfig} />
                <Route exact path={"/simulation"} component={Simulation} />
              </div>
            </div>
          </div>
          <PreferencesDialog />
          <ConnectionParametersEditorDialog />
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
