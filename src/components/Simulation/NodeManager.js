import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getP } from "redux-polyglot";
import { pPropType } from "../../customPropTypes";
import { selectSimulationNodes } from "../../reduxStore/selectors";

class NodeManager extends Component {
  render() {
    return <Fragment>manager</Fragment>;
  }
}

NodeManager.propTypes = {
  p: pPropType.isRequired,
  simulationNodes: PropTypes.arrayOf(PropTypes.object).isRequired
};

function mapStateToProps(state) {
  return {
    p: getP(state),
    simulationNodes: selectSimulationNodes(state)
  };
}

export default connect(mapStateToProps)(NodeManager);
