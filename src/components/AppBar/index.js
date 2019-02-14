/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { selectTheme } from "../../reduxStore/selectors";
import colours from "../../styling/colours";
import RightIconsMenu from "./RightIconsMenu";

class AppBar extends Component {
  render() {
    const { colourScheme } = this.props;
    const backgroundColour = colours.appBarBackground[colourScheme];
    const foregroundColour = colours.appBarForeground[colourScheme];
    return (
      <div
        data-role="appbar"
        data-expand
        className={`app-bar app-bar-expand bg-${backgroundColour} fg-${foregroundColour}`}
      >
        <Link to="/" className={"brand no-hover"}>
          <span style={{ fontSize: "2.5rem", fontWeight: "200" }}>diorama</span>
        </Link>
        <RightIconsMenu />
      </div>
    );
  }
}

AppBar.propTypes = {
  colourScheme: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    colourScheme: selectTheme(state).colourScheme
  };
}

export default connect(mapStateToProps)(AppBar);
