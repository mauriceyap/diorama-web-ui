import React, { Component } from "react";
import PropTypes from "prop-types";
import MetroIcon from "../MetroIcon";

const startButtonWrapperStyle = {
  textAlign: "center",
  marginTop: "6rem",
  marginBottom: "6rem",
  width: "100%"
};

export default class StartSimulation extends Component {
  render() {
    const { onButtonClick } = this.props;
    return (
      <div style={startButtonWrapperStyle}>
        <button className="button success large" onClick={onButtonClick}>
          <MetroIcon icon={"play"} /> Start simulation
        </button>
      </div>
    );
  }
}

StartSimulation.propTypes = {
  onButtonClick: PropTypes.func.isRequired
};
