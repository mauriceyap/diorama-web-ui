import React, { Component } from "react";
import PropTypes from "prop-types";
import { pPropType } from "../../customPropTypes";
import { connect } from "react-redux";
import { getP } from "redux-polyglot";

class LoadingScreen extends Component {
  render() {
    const { simulationState, polyglot } = this.props;
    return (
      <div>
        <div
          data-role="activity"
          data-type="ring"
          data-style="color"
          style={{ margin: "30vh auto 0 auto" }}
        />
        <div style={{ textAlign: "center", margin: "3rem" }}>
          <p
            className={"text-medium fg-darkGray"}
            style={{ fontSize: "1.3rem" }}
          >
            {polyglot.t(simulationState)}...
          </p>
        </div>
      </div>
    );
  }
}

LoadingScreen.propTypes = {
  simulationState: PropTypes.string.isRequired,
  polyglot: pPropType.isRequired
};

function mapStateToProps(state) {
  return {
    polyglot: getP(state)
  };
}

export default connect(mapStateToProps)(LoadingScreen);
