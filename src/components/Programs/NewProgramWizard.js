import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import Metro from "metro4";
import {
  runtimeIcons,
  runtimeLabels,
  runtimes,
  isComingSoon
} from "./constants";
import {
  selectCustomisation,
  selectPrograms
} from "../../reduxStore/selectors";
import colours from "../../customisation/colours";
import { noop, notAllowedCursorOnHoverStyle } from "../../utils";
import {
  onClickNewProgramCancel,
  onClickNewProgramSubmit,
  toastSeparationDistance,
  toastTimeout
} from "../../styleConstants";
import { pPropType } from "../../customPropTypes";
import { getP } from "redux-polyglot";
import validator from "./validator";

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
    return validator(
      { runtime, name },
      ["name", "runtime"],
      existingProgramNames,
      runtimes,
      p
    );
  }

  onClickCancel() {
    const { cancelCb } = this.props;
    this.setState(initialState);
    cancelCb();
  }

  onClickSubmit() {
    const { submitCb } = this.props;
    const { runtime, name } = this.state;

    const errorMessages = this.validateValues();

    if (errorMessages.length === 0) {
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
        data-icon-help={`<span>${p.tc("common.cancel")}</span>`}
        data-on-help-click={onClickNewProgramCancel}
        data-on-finish-click={onClickNewProgramSubmit}
        data-button-mode="button"
        id={"newProgramWizard"}
      >
        <section>
          <div className="page-content">
            <h5>{p.tc("programs.chooseARuntime")}</h5>
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
                  data-effect={isComingSoon[runtime] ? "hover-slide-up" : ""}
                  key={runtime}
                  onClick={
                    isComingSoon[runtime]
                      ? noop
                      : () => this.setRuntime(runtime)
                  }
                  style={
                    isComingSoon[runtime] ? notAllowedCursorOnHoverStyle : {}
                  }
                >
                  {isComingSoon[runtime] ? (
                    <Fragment>
                      <div className="slide-front">
                        <span className="badge-top bg-darkRed">
                          {p.tc("programs.comingSoon")}
                        </span>
                        <img
                          src={runtimeIcons[runtime]}
                          alt={runtime}
                          className={"icon"}
                        />
                      </div>
                      <div className="slide-back d-flex flex-justify-center flex-align-center p-4 bg-red">
                        <p className="text-center">
                          {p.tc("programs.comingSoon")}
                        </p>
                      </div>
                    </Fragment>
                  ) : (
                    <img
                      src={runtimeIcons[runtime]}
                      alt={runtime}
                      className={"icon"}
                    />
                  )}
                  <span className="branding-bar">{runtimeLabels[runtime]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section>
          <div className="page-content">
            <h5>{p.tc("programs.giveItAName")}</h5>
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
