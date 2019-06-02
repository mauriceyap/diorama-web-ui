/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import MetroIcon from "../MetroIcon";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Metro from "metro4";

import { preferencesDialogId } from "../../styleConstants";
import { selectSocket } from "../../reduxStore/selectors";
import { Link } from "react-router-dom";

function openPreferencesDialog() {
  Metro.dialog.open(`#${preferencesDialogId}`);
}

const items = [{ icon: "cog", onClick: openPreferencesDialog }];

class RightIconsMenu extends Component {
  static renderOpenModalItems() {
    return items.map(({ icon, onClick }) => (
      <li onClick={onClick} key={icon}>
        <a href="#">
          <MetroIcon icon={icon} />
        </a>
      </li>
    ));
  }

  render() {
    const { isSocketConnected } = this.props;
    return (
      <ul
        className="app-bar-menu"
        style={{ marginLeft: "auto", marginRight: 0 }}
      >
        <li>
          <a>
            {isSocketConnected ? (
              <MetroIcon icon={"network-cell"} colour={"green"} />
            ) : (
              <MetroIcon icon={"cell-off"} colour={"red"} />
            )}
          </a>
        </li>
        <li>
          <Link to={"/docs"}>
            <MetroIcon icon={"info"} />
          </Link>
        </li>
        {RightIconsMenu.renderOpenModalItems()}
      </ul>
    );
  }
}

RightIconsMenu.propTypes = {
  isSocketConnected: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isSocketConnected: selectSocket(state).connected
  };
}

export default connect(mapStateToProps)(RightIconsMenu);
