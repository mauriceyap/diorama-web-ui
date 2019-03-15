import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

export default class EditDescription extends Component {
  render() {
    const { polyglot, defaultValue, onChange } = this.props;
    return (
      <Fragment>
        <h6>{polyglot.tc("description")}</h6>
        <p>{polyglot.t("whatDoesThisNodeDo")}</p>
        <textarea
          data-role="textarea"
          data-prepend="<span class='mif-paragraph-left'></span>"
          data-default-value={defaultValue}
          onChange={onChange}
        />
      </Fragment>
    );
  }
}

EditDescription.propTypes = {
  polyglot: PropTypes.object.isRequired,
  defaultValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
