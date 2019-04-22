import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { selectEditingConnectionParameters } from "../../reduxStore/selectors";
import {
  connectionParametersEditorDialogId,
  onChangeConnectionParametersSuccessRate,
  onSelectConnectionParametersDelayDistribution
} from "../../styleConstants";
import { getP } from "redux-polyglot";
import { pPropType } from "../../customPropTypes";
import { defaultParameters, distributions } from "./constants";
import {
  setConnectionParametersEditorDelayDistribution,
  setConnectionParametersEditorDelayDistributionParameters,
  setConnectionParametersEditorSuccessRate
} from "../../reduxStore/editingConnectionParameters/reducer";
import SocketEvents from "../../SocketEvents";
import Socket from "../../Socket";

class ConnectionParametersEditorDialog extends Component {
  constructor(props) {
    super(props);
    window[
      onSelectConnectionParametersDelayDistribution
    ] = this.onChangeConnectionParametersDelayDistribution.bind(this);
    window[
      onChangeConnectionParametersSuccessRate
    ] = this.onChangeConnectionParametersSuccessRate.bind(this);
    this.onChangeConnectionParametersDelayDistributionParameter = this.onChangeConnectionParametersDelayDistributionParameter.bind(
      this
    );
    this.saveParameters = this.saveParameters.bind(this);
    this.resetToDefault = this.resetToDefault.bind(this);
    this.isEditingParametersDefault = this.isEditingParametersDefault.bind(
      this
    );
  }

  onChangeConnectionParametersDelayDistributionParameter({
    target: {
      value,
      dataset: { parameter }
    }
  }) {
    const { dispatch, delayDistributionParameters } = this.props;
    dispatch(
      setConnectionParametersEditorDelayDistributionParameters({
        ...delayDistributionParameters,
        [parameter]: Number(value)
      })
    );
  }

  onChangeConnectionParametersSuccessRate(value) {
    const { dispatch } = this.props;
    dispatch(setConnectionParametersEditorSuccessRate(value / 100));
  }

  onChangeConnectionParametersDelayDistribution(value) {
    const { dispatch } = this.props;
    dispatch(setConnectionParametersEditorDelayDistribution(value));
    dispatch(setConnectionParametersEditorDelayDistributionParameters({}));
  }

  isEditingParametersDefault() {
    const {
      successRate,
      delayDistribution,
      delayDistributionParameters
    } = this.props;
    const {
      successRate: defaultSuccessRate,
      delayDistribution: defaultDelayDistribution,
      delayDistributionParameters: defaultDelayDistributionParameters
    } = defaultParameters;
    return (
      successRate === defaultSuccessRate &&
      delayDistribution === defaultDelayDistribution &&
      Object.keys(defaultDelayDistributionParameters).every(
        parameter =>
          delayDistributionParameters[parameter] ===
          defaultDelayDistributionParameters[parameter]
      )
    );
  }

  saveParameters() {
    const {
      fromNid,
      toNid,
      delayDistribution,
      delayDistributionParameters,
      successRate
    } = this.props;

    // TODO: validate parameters

    Socket.send(SocketEvents.MODIFY_CONNECTION_PARAMETERS, {
      fromNid,
      toNid,
      parameters: {
        delayDistribution,
        delayDistributionParameters,
        successRate
      }
    });
    Socket.send(SocketEvents.GET_CONNECTION_PARAMETERS);
  }

  resetToDefault() {
    const { dispatch } = this.props;
    const {
      successRate,
      delayDistribution,
      delayDistributionParameters
    } = defaultParameters;
    dispatch(setConnectionParametersEditorSuccessRate(successRate));
    dispatch(setConnectionParametersEditorDelayDistribution(delayDistribution));
    dispatch(
      setConnectionParametersEditorDelayDistributionParameters(
        delayDistributionParameters
      )
    );
  }

  render() {
    const {
      fromNid,
      toNid,
      polyglot,
      delayDistribution,
      delayDistributionParameters,
      successRate
    } = this.props;
    return (
      <div
        className="dialog"
        data-role="dialog"
        id={connectionParametersEditorDialogId}
      >
        <div className="dialog-title">
          {polyglot.tc("modifyConnection", { fromNid, toNid })}
        </div>
        <div className="dialog-content" key={delayDistribution}>
          <h5 className="mb-8">{polyglot.tc("messageSendingSuccessRate")}</h5>
          <input
            data-role="slider"
            data-hint="true"
            data-hint-always="true"
            data-min="0"
            data-max="100"
            data-hint-mask="$1%"
            data-value={successRate * 100}
            data-on-stop={onChangeConnectionParametersSuccessRate}
          />
          <h5 className="mb-4 mt-2">{polyglot.tc("messageSendingDelay")}</h5>
          <p>
            <strong>{polyglot.tc("distribution")}</strong>
          </p>
          <select
            data-role="select"
            data-on-item-select={onSelectConnectionParametersDelayDistribution}
            defaultValue={delayDistribution}
          >
            {Object.keys(distributions).map(distribution => (
              <option value={distribution} key={distribution}>
                {distribution}
              </option>
            ))}
          </select>
          <p>
            <strong>{polyglot.tc("parameters")}</strong>
          </p>

          <div key={delayDistribution}>
            {distributions[delayDistribution] &&
              distributions[delayDistribution].map(parameter => (
                <Fragment key={parameter}>
                  <p>{parameter}</p>
                  <input
                    type="number"
                    data-role="input"
                    data-append={polyglot.t("millisecondAbbreviation")}
                    defaultValue={delayDistributionParameters[parameter]}
                    onChange={
                      this
                        .onChangeConnectionParametersDelayDistributionParameter
                    }
                    data-parameter={parameter}
                  />
                </Fragment>
              ))}
          </div>
        </div>
        <div className="dialog-actions">
          <button
            className="button primary js-dialog-close"
            onClick={this.saveParameters}
          >
            Save
          </button>
          {!this.isEditingParametersDefault() && (
            <button className="button info" onClick={this.resetToDefault}>
              Reset to default
            </button>
          )}
          <button className="button js-dialog-close">Cancel</button>
        </div>
      </div>
    );
  }
}

ConnectionParametersEditorDialog.propTypes = {
  fromNid: PropTypes.string.isRequired,
  toNid: PropTypes.string.isRequired,
  polyglot: pPropType.isRequired,
  delayDistribution: PropTypes.string.isRequired,
  delayDistributionParameters: PropTypes.object.isRequired,
  successRate: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {
    fromNid,
    toNid,
    delayDistribution,
    delayDistributionParameters,
    successRate
  } = selectEditingConnectionParameters(state);
  return {
    fromNid,
    toNid,
    delayDistribution,
    delayDistributionParameters,
    successRate,
    polyglot: getP(state)
  };
}

export default connect(mapStateToProps)(ConnectionParametersEditorDialog);
