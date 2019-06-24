import React, { Component } from "react";
import PropTypes from "prop-types";
import MetroIcon from "../MetroIcon";
import { pPropType } from "../../customPropTypes";
import { getP } from "redux-polyglot";
import { connect } from "react-redux";

const startButtonWrapperStyle = {
  textAlign: "center",
  marginTop: "6rem",
  marginBottom: "6rem",
  width: "100%"
};

class StartSimulation extends Component {
  render() {
    const { onButtonClick, polyglot } = this.props;
    return (
      <div style={startButtonWrapperStyle}>
        <button className="button success large" onClick={onButtonClick}>
          <MetroIcon icon={"play"} />{" "}
          {polyglot.tc("simulation.startSimulation")}
        </button>
      </div>
    );
  }
}

StartSimulation.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  polyglot: pPropType.isRequired
};

function mapStateToProps(state) {
  return {
    polyglot: getP(state)
  };
}

export default connect(mapStateToProps)(StartSimulation);
