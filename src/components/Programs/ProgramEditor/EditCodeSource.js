import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { codeSourceLabels, codeSources } from "../constants";

export default class EditCodeSource extends Component {
  render() {
    const { polyglot, selectedValue, onChange } = this.props;
    return (
      <Fragment>
        <h6>{polyglot.tc("codeSource")}</h6>
        <form>
          {codeSources.map(source => (
            <input
              name={"codeSource"}
              type="radio"
              data-role="radio"
              data-caption={polyglot.tc(codeSourceLabels[source])}
              value={source}
              checked={selectedValue === source}
              onChange={onChange}
              key={source}
            />
          ))}
        </form>
      </Fragment>
    );
  }
}

EditCodeSource.propTypes = {
  polyglot: PropTypes.object.isRequired,
  selectedValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
