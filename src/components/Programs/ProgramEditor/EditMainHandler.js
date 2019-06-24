import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

export default class EditMainHandler extends Component {
  render() {
    const { polyglot, onChange, defaultValue, isRaw, runtime } = this.props;
    return (
      <Fragment>
        <h6>
          {isRaw
            ? polyglot.tc("programs.mainFunction")
            : polyglot.tc("programs.mainHandler")}
        </h6>
        <p>
          {polyglot.tc(
            isRaw
              ? `programs.mainFunctionInformation.${runtime}`
              : `programs.mainHandlerInformation.${runtime}`
          )}
        </p>
        <input
          type="text"
          data-role="input"
          data-prepend="<span class='mif-power'></span>"
          data-default-value={defaultValue}
          onChange={onChange}
        />
      </Fragment>
    );
  }
}

EditMainHandler.propTypes = {
  polyglot: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string.isRequired,
  isRaw: PropTypes.bool.isRequired,
  runtime: PropTypes.string.isRequired
};
