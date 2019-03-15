import React, { Component } from "react";
import PropTypes from "prop-types";

export default class LoadingScreen extends Component {
  render() {
    const { simulationState } = this.props;
    return (
      <div>
        <p>Loading...</p>
        <p>{simulationState}</p>
      </div>
    );
  }
}

LoadingScreen.propTypes = {
  simulationState: PropTypes.string.isRequired
};
