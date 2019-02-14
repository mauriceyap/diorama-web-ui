import React, { Component } from "react";
import PropTypes from "prop-types";
import Metro from "metro4";
import { connect } from "react-redux";

import { preferencesDialogId } from "../../styling/styleConstants";
import { colourSchemes } from "../../styling/colours";
import { selectTheme } from "../../reduxStore/selectors";
import { setColourScheme } from "../../reduxStore/theme/reducer";

class PreferencesDialog extends Component {
  constructor(props) {
    super(props);
    window.onChangeColourSchemeSelect = this.changeColourScheme.bind(this);
  }

  static closeDialog() {
    Metro.dialog.close(`#${preferencesDialogId}`);
  }

  changeColourScheme(colourSchemeArray) {
    const { dispatch } = this.props;
    dispatch(setColourScheme(colourSchemeArray[0]));
  }

  render() {
    const { colourScheme } = this.props;
    return (
      <div className="dialog" id={preferencesDialogId} data-role="dialog">
        <div className="dialog-title">Preferences</div>
        <div className="dialog-content">
          <h6>Colour scheme</h6>
          <select
            data-role="select"
            data-on-change="onChangeColourSchemeSelect"
            data-default-value={colourScheme}
          >
            {colourSchemes.map(cs => (
              <option key={cs} value={cs}>
                {cs}
              </option>
            ))}
          </select>
        </div>
        <div className="dialog-actions">
          <button
            className="button primary"
            onClick={PreferencesDialog.closeDialog}
          >
            Done
          </button>
        </div>
      </div>
    );
  }
}

PreferencesDialog.propTypes = {
  colourScheme: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    colourScheme: selectTheme(state).colourScheme
  };
}

export default connect(mapStateToProps)(PreferencesDialog);
