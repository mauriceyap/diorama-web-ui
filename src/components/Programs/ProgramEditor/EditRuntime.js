import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { onChangeProgramRuntime } from "../../../styleConstants";
import { isComingSoon, runtimeLabels, runtimes } from "../constants";

export default class EditRuntime extends Component {
  render() {
    const { polyglot, defaultValue } = this.props;
    return (
      <Fragment>
        <h6>{polyglot.tc("programs.runtime")}</h6>
        <p>{polyglot.tc("programs.runtimeExplanation")}</p>
        <select
          data-role="select"
          defaultValue={defaultValue}
          data-on-change={onChangeProgramRuntime}
        >
          {runtimes
            .filter(runtime => !isComingSoon[runtime])
            .map(runtime => (
              <option value={runtime} key={runtime}>
                {runtimeLabels[runtime]}
              </option>
            ))}
        </select>
      </Fragment>
    );
  }
}

EditRuntime.propTypes = {
  polyglot: PropTypes.object.isRequired,
  defaultValue: PropTypes.string.isRequired,
  runtimes: PropTypes.arrayOf(PropTypes.string).isRequired
};
