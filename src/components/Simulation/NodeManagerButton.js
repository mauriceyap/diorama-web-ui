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
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const {
      nid: propNid,
      action,
      latestTimestamp: propLatestTimestamp,
      nids,
      latestTimestamps: propLatestTimestamps
    } = this.props;
    const latestTimestamps =
      propNid && propLatestTimestamp
        ? { propNid: propLatestTimestamp }
        : propLatestTimestamps;
    (propNid && propLatestTimestamp ? [propNid] : nids).forEach(nid => {
      Socket.send(SocketEvents.PERFORM_NODE_ACTION, { nid, action });
      if (action === "start") {
        Socket.send(SocketEvents.STREAM_NODE_LOGS, {
          nid,
          since: latestTimestamps[nid]
        });
      }
    });
  }

  render() {
    const { action, compact, polyglot, nids } = this.props;
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
  nid: PropTypes.string,
  nids: PropTypes.arrayOf(PropTypes.string),
  latestTimestamps: PropTypes.object,
  latestTimestamp: PropTypes.string,
  compact: PropTypes.bool,
  polyglot: pPropType.isRequired
};

NodeManagerButton.defaultProps = {
  latestTimestamp: undefined,
  compact: false,
  nid: undefined,
  nids: [],
  latestTimestamps: {}
};

function mapStateToProps(state) {
  return {
    polyglot: getP(state)
  };
}

export default connect(mapStateToProps)(NodeManagerButton);
