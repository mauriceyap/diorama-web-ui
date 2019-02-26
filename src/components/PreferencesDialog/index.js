import React, { Component } from "react";
import PropTypes from "prop-types";
import Metro from "metro4";
import { connect } from "react-redux";
import { setLanguage, getLocale, getP } from "redux-polyglot";
import translations, { polyglotLocales } from "../../translations";

import {
  onChangeColourSchemeSelect,
  onChangeLanguageSelect,
  preferencesDialogId
} from "../../styleConstants";
import { colourSchemes } from "../../customisation/colours";
import { selectCustomisation } from "../../reduxStore/selectors";
import { setColourScheme } from "../../reduxStore/customisation/reducer";
import { pPropType } from "../../customPropTypes";

class PreferencesDialog extends Component {
  constructor(props) {
    super(props);
    window[onChangeColourSchemeSelect] = this.changeColourScheme.bind(this);
    window[onChangeLanguageSelect] = this.changeLanguage.bind(this);
  }

  static closeDialog() {
    Metro.dialog.close(`#${preferencesDialogId}`);
  }

  changeColourScheme(colourSchemeArray) {
    const { dispatch } = this.props;
    dispatch(setColourScheme(colourSchemeArray[0]));
  }

  changeLanguage(languageCodeArray) {
    const { dispatch } = this.props;
    const languageCode = languageCodeArray[0];
    dispatch(setLanguage(languageCode, translations[languageCode]));
  }

  render() {
    const { colourScheme, polyglotLocale, p } = this.props;
    return (
      <div className="dialog" id={preferencesDialogId} data-role="dialog">
        <div className="dialog-title">{p.tc("preferences")}</div>
        <div className="dialog-content" key={polyglotLocale}>
          <h6>{p.tc("colourScheme")}</h6>
          <select
            data-role="select"
            data-on-change={onChangeColourSchemeSelect}
            defaultValue={colourScheme}
          >
            {colourSchemes.map(cs => (
              <option key={p.tc(cs)} value={cs}>
                {p.tc(cs)}
              </option>
            ))}
          </select>
          <h6>{p.tc("language")}</h6>
          <select
            data-role="select"
            data-on-change={onChangeLanguageSelect}
            defaultValue={polyglotLocale}
          >
            {polyglotLocales.map(({ label, locale }) => (
              <option key={locale} value={locale}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="dialog-actions">
          <button
            className="button primary"
            onClick={PreferencesDialog.closeDialog}
          >
            {p.tc("done")}
          </button>
        </div>
      </div>
    );
  }
}

PreferencesDialog.propTypes = {
  colourScheme: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  polyglotLocale: PropTypes.string.isRequired,
  p: pPropType.isRequired
};

function mapStateToProps(state) {
  return {
    colourScheme: selectCustomisation(state).colourScheme,
    polyglotLocale: getLocale(state),
    p: getP(state)
  };
}

export default connect(mapStateToProps)(PreferencesDialog);
