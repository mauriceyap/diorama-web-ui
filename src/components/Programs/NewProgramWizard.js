import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import Metro from "metro4";
import { runtimeIcons, runtimeLabels, runtimes } from "./constants";
import {
  selectCustomisation,
  selectPrograms
} from "../../reduxStore/selectors";
import colours from "../../customisation/colours";
import { noop } from "../../constants";
import {
  onClickNewProgramCancel,
  onClickNewProgramSubmit,
  toastSeparationDistance,
  toastTimeout
} from "../../customisation/styleConstants";
import { isStringEmpty } from "../../utils";
import { pPropType } from "../../customPropTypes";
import { getP } from "redux-polyglot";

const initialState = {
  name: null,
  runtime: null
};

class NewProgramWizard extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.setName = this.setName.bind(this);
    this.setRuntime = this.setRuntime.bind(this);
    this.validateValues = this.validateValues.bind(this);

    window[onClickNewProgramCancel] = this.onClickCancel.bind(this);
    window[onClickNewProgramSubmit] = this.onClickSubmit.bind(this);
  }

  validateValues() {
    const { runtime, name } = this.state;
    const { existingProgramNames, p } = this.props;

    const isNameEmpty = isStringEmpty(name);
    const isNameUsed = existingProgramNames.includes(name);
    const isRuntimeNull = runtime == null;
    const isRuntimeInvalid =
      !isStringEmpty(runtime) && !runtimes.contains(runtime);

    return {
      isValid: !(
        isNameEmpty ||
        isNameUsed ||
        isRuntimeNull ||
        isRuntimeInvalid
      ),
      errorMessages: [
        ...(isNameEmpty ? [p.t("giveYourProgramAName")] : []),
        ...(isNameUsed ? [p.t("useADifferentName", { name })] : []),
        ...(isRuntimeNull ? [p.t("chooseARuntimeError")] : []),
        ...(isRuntimeInvalid ? [p.t("runtimeInvalid")] : [])
      ]
    };
  }

  onClickCancel() {
    const { cancelCb } = this.props;
    this.setState(initialState);
    cancelCb();
  }

  onClickSubmit() {
    const { submitCb } = this.props;
    const { runtime, name } = this.state;

    const { isValid, errorMessages } = this.validateValues();

    if (isValid) {
      this.setState(initialState);
      submitCb(runtime, name);
    } else {
      errorMessages.forEach((message, index) =>
        Metro.toast.create(message, noop, toastTimeout, "alert", {
          showTop: true,
          distance: toastSeparationDistance * index
        })
      );
    }
  }

  setName(name) {
    this.setState({ name });
  }

  setRuntime(runtime) {
    this.setState({ runtime });
  }

  render() {
    const { colourScheme, p } = this.props;
    const { runtime: selectedRuntime } = this.state;
    return (
      <div
        data-role="wizard"
        data-icon-help={`<span>${p.tc('cancel')}</span>`}
        data-on-help-click={onClickNewProgramCancel}
        data-on-finish-click={onClickNewProgramSubmit}
        data-button-mode="button"
        id={"newProgramWizard"}
      >
        <section>
          <div className="page-content">
            <h5>{p.tc('chooseARuntime')}</h5>
            <p />
            <div className="tiles-grid">
              {runtimes.map(runtime => (
                <div
                  data-role="tile"
                  className={classnames(
                    `bg-${colours.newProgramRuntimeTiles[colourScheme]}`,
                    "tile-medium",
                    { selected: runtime === selectedRuntime }
                  )}
                  data-size="medium"
                  key={runtime}
                  onClick={() => this.setRuntime(runtime)}
                >
                  <img
                    src={runtimeIcons[runtime]}
                    alt={runtime}
                    className={"icon"}
                  />
                  <span className="branding-bar">{runtimeLabels[runtime]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section>
          <div className="page-content">
            <h5>{p.tc('giveItAName')}</h5>
            <p>{p.tc('youCanAlwaysChangeItLater')}</p>
            <p>
              <input
                type="text"
                data-role="input"
                onChange={({ target: { value } }) => this.setName(value)}
              />
            </p>
          </div>
        </section>
      </div>
    );
  }
}

NewProgramWizard.propTypes = {
  colourScheme: PropTypes.string.isRequired,
  existingProgramNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  cancelCb: PropTypes.func,
  submitCb: PropTypes.func,
  p: pPropType.isRequired
};

NewProgramWizard.defaultProps = {
  cancelCb: noop,
  submitCb: noop
};

function mapStateToProps(state) {
  return {
    colourScheme: selectCustomisation(state).colourScheme,
    existingProgramNames: selectPrograms(state).map(({ name }) => name),
    p: getP(state)
  };
}

export default connect(mapStateToProps)(NewProgramWizard);
