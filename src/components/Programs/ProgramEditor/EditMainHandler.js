import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class EditMainHandler extends Component {
  render() {
    const { polyglot, onChange, defaultValue } = this.props;
    return (
      <Fragment>
        <h6>{polyglot.tc("mainHandler")}</h6>
        <p>something</p>
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
  defaultValue: PropTypes.string.isRequired
};
