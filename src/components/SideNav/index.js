import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";

import colours from "../../customisation/colours";
import { selectCustomisation } from "../../reduxStore/selectors";
import { getP } from "redux-polyglot";
import { pPropType } from "../../customPropTypes";
import {
  shrunkSideBarWidth,
  sideBarShrinkScreenWidth,
  sideBarWidth
} from "../../styleConstants";
import { isScreenWidthGreaterThan } from "../../utils";

const sideNavItems = [
  { icon: "apps", polyglotLabel: "programs", route: "/programs" },
  {
    icon: "tree",
    polyglotLabel: "networkTopology",
    route: "/network-topology"
  },
  { icon: "wrench", polyglotLabel: "configuration", route: "/custom-config" },
  { icon: "space-shuttle", polyglotLabel: "simulation", route: "/simulation" }
];

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.renderItems = this.renderItems.bind(this);
  }

  renderItems() {
    const { p } = this.props;
    return sideNavItems.map(({ icon, polyglotLabel, route }) => (
      <li key={`${icon}${polyglotLabel}${route}`}>
        <Link to={route}>
          <span className={`mif-${icon} icon`} />
          {isScreenWidthGreaterThan(sideBarShrinkScreenWidth) && (
            <span className="title">{p.tc(polyglotLabel)}</span>
          )}
        </Link>
      </li>
    ));
  }
  render() {
    const { colourScheme } = this.props;
    const backgroundColour = colours.sideNavBackground[colourScheme];
    const foregroundColour = colours.sideNavForeground[colourScheme];
    const className = classnames(
      "sidenav-simple",
      "sidenav-simple-expand-fs",
      `bg-${backgroundColour}`,
      `fg-${foregroundColour}`
    );
    return (
      <ul
        className={className}
        style={{
          width: isScreenWidthGreaterThan(sideBarShrinkScreenWidth)
            ? sideBarWidth
            : shrunkSideBarWidth
        }}
      >
        {this.renderItems()}
      </ul>
    );
  }
}

SideNav.propTypes = {
  colourScheme: PropTypes.string.isRequired,
  p: pPropType.isRequired
};

function mapStateToProps(state) {
  return {
    colourScheme: selectCustomisation(state).colourScheme,
    p: getP(state)
  };
}

export default connect(mapStateToProps)(SideNav);
