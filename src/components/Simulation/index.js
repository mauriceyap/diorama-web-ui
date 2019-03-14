import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { getP } from "redux-polyglot";
import { connect } from "react-redux";
import { pPropType } from "../../customPropTypes";

class Simulation extends Component {
  render() {
    const { p } = this.props;
    return (
      <Fragment>
        <span className={"display1"}>{p.tc("simulation")}</span>
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
