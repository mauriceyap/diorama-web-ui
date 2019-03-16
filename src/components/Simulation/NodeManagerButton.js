import React, { Component } from "react";
import PropTypes from "prop-types";
import Socket from "../../Socket";
import SocketEvents from "../../SocketEvents";
import MetroIcon from "../MetroIcon";

const bgColours = {
  start: "emerald",
  stop: "lightCrimson",
  pause: "darkCobalt",
  unpause: "darkEmerald"
};

const bgHoverColours = {
  start: "darkEmerald",
  stop: "crimson",
  pause: "cobalt",
  unpause: "emerald"
};

const fgColours = {
  start: "white",
  stop: "white",
  pause: "white",
  unpause: "white"
};

const icons = {
  start: "play",
  stop: "stop",
  pause: "pause",
  unpause: "forward"
};

export default class NodeManagerButton extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { nid, action } = this.props;
    Socket.send(SocketEvents.PERFORM_NODE_ACTION, { nid, action });
  }

  render() {
    const { action } = this.props;
    return (
      <button
        className={`button square bg-${bgColours[action]} bg-${
          bgHoverColours[action]
        }-hover`}
        onClick={this.onClick}
      >
        <MetroIcon icon={icons[action]} colour={fgColours[action]} />
      </button>
    );
  }
}

NodeManagerButton.propTypes = {
  action: PropTypes.string.isRequired,
  nid: PropTypes.string.isRequired
};
