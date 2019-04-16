import React, { Component } from "react";
import PropTypes from "prop-types";
import Socket from "../../Socket";
import SocketEvents from "../../SocketEvents";
import MetroIcon from "../MetroIcon";
import { connect } from "react-redux";
import { getP } from "redux-polyglot";
import { pPropType } from "../../customPropTypes";

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

class NodeManagerButton extends Component {
  constructor(props) {
    super(props);
    this.state = { isClicked: false };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { action, nids, latestTimestamps } = this.props;
    nids.forEach(nid => {
      Socket.send(SocketEvents.PERFORM_NODE_ACTION, { nid, action });
      if (action === "start") {
        Socket.send(SocketEvents.STREAM_NODE_LOGS, {
          nid,
          since: latestTimestamps[nid]
        });
      }
    });

    this.setState({ isClicked: true });
  }

  render() {
    const { action, compact, polyglot, nids } = this.props;
    const { isClicked } = this.state;

    if (isClicked) {
      return (
        <button
          className={`button bg-${bgColours[action]} ${
            compact ? "square" : ""
          }`}
        >
          <div
            data-role="activity"
            className={`bg-${bgColours[action]}`}
            style={{
              margin: "auto",
              padding: 0
            }}
          />
        </button>
      );
    }
    return (
      <button
        className={`button bg-${bgColours[action]} bg-${
          bgHoverColours[action]
        }-hover ${compact ? "square" : ""} fg-${fgColours[action]}`}
        onClick={this.onClick}
      >
        <MetroIcon icon={icons[action]} colour={fgColours[action]} />
        {!compact &&
          ` ${polyglot.tc(`${action}Selected`, {
            numberSelected: nids.length
          })}`}
      </button>
    );
  }
}

NodeManagerButton.propTypes = {
  action: PropTypes.string.isRequired,
  nids: PropTypes.arrayOf(PropTypes.string).isRequired,
  latestTimestamps: PropTypes.object.isRequired,
  compact: PropTypes.bool,
  polyglot: pPropType.isRequired
};

NodeManagerButton.defaultProps = {
  compact: false
};

function mapStateToProps(state) {
  return {
    polyglot: getP(state)
  };
}

export default connect(mapStateToProps)(NodeManagerButton);
