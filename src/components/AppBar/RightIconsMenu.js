/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import MetroIcon from "../MetroIcon";
import Metro from "metro4";

import { preferencesDialogId } from "../../styling/styleConstants";

function openPreferencesDialog() {
  Metro.dialog.open(`#${preferencesDialogId}`);
}

const items = [{ icon: "cog", onClick: openPreferencesDialog }];

export default class RightIconsMenu extends Component {
  static renderItems() {
    return items.map(({ icon, onClick }) => (
      <li onClick={onClick}>
        <a href="#">
          <MetroIcon icon={icon} />
        </a>
      </li>
    ));
  }

  render() {
    return (
      <ul
        className="app-bar-menu"
        style={{ marginLeft: "auto", marginRight: 0 }}
      >
        {RightIconsMenu.renderItems()}
      </ul>
    );
  }
}
