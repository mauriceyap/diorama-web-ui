import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";

import colours from "../../styling/colours";
import { selectTheme } from "../../reduxStore/selectors";

const sideNavItems = [{ icon: "apps", label: "Programs", route: "/programs" }];

class SideNav extends Component {
  static renderItems() {
    return sideNavItems.map(({ icon, label, route }) => (
      <li>
        <Link to={route}>
          <span className={`mif-${icon} icon`} />
          <span className="title">{label}</span>
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
      <ul className={className}>
        {SideNav.renderItems()}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    colourScheme: selectTheme(state).colourScheme
  };
}

export default connect(mapStateToProps)(SideNav);
