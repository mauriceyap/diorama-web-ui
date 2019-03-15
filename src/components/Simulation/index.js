import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { getP } from "redux-polyglot";
import { connect } from "react-redux";
import { pPropType } from "../../customPropTypes";
import Socket from "../../Socket";
import SocketEvents from "../../SocketEvents";

class Simulation extends Component {
  render() {
    const { p } = this.props;
    return (
      <Fragment>
        <span className={"display1"}>{p.tc("simulation")}</span>
        <button
          className="button"
          onClick={() => Socket.send(SocketEvents.SET_UP_SIMULATION)}
        >
          start
        </button>
        <button
          className="button warning"
          onClick={() => Socket.send(SocketEvents.STOP_AND_RESET_SIMULATION)}
        >
          stop and reset
        </button>
      </Fragment>
    );
  }
}

Simulation.propTypes = {
  p: pPropType.isRequired
};

function mapStateToProps(state) {
  return {
    p: getP(state)
  };
}

export default connect(mapStateToProps)(Simulation);
