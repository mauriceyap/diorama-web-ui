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
  {
    icon: "apps",
    polyglotLabel: "programs",
    route: "/programs",
    introStepsClassName: "intro-step-one"
  },
  {
    icon: "tree",
    polyglotLabel: "networkTopology",
    route: "/network-topology",
    introStepsClassName: "intro-step-two"
  },
  { icon: "wrench", polyglotLabel: "configuration", route: "/custom-config" },
  {
    icon: "space-shuttle",
    polyglotLabel: "simulation",
    route: "/simulation",
    introStepsClassName: "intro-step-three"
  }
];

class SideNav extends Component {
  render() {
    const { colourScheme, p } = this.props;
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
        {sideNavItems.map(
          ({ icon, polyglotLabel, route, introStepsClassName }) => (
            <li key={`${icon}${polyglotLabel}${route}`}>
              <Link to={route}>
                <span
                  className={classnames(
                    `mif-${icon} icon`,
                    introStepsClassName
                  )}
                />
                {isScreenWidthGreaterThan(sideBarShrinkScreenWidth) && (
                  <span className="title">
                    {p.tc(`sideNav.${polyglotLabel}`)}
                  </span>
                )}
              </Link>
            </li>
          )
        )}
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
