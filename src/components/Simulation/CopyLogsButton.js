import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MetroIcon from "../MetroIcon";
import { selectSimulationLogs } from "../../reduxStore/selectors";
import Metro from "metro4";
import { noop } from "../../utils";
import { toastTimeout } from "../../styleConstants";
import { getP } from "redux-polyglot";
import { pPropType } from "../../customPropTypes";

class CopyLogsButton extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { logsData, polyglot } = this.props;
    const textToCopy =
      "nid\ttimestamp\tmessage\n" +
      logsData
        .map(
          ({ nid, timestamp, message }) => `${nid}\t${timestamp}\t${message}`
        )
        .join("");
    const dummyTextAreaElement = document.createElement("textarea");
    dummyTextAreaElement.value = textToCopy;
    document.body.appendChild(dummyTextAreaElement);
    dummyTextAreaElement.select();
    document.execCommand("copy");
    document.body.removeChild(dummyTextAreaElement);

    Metro.toast.create(polyglot.t("copied"), noop, toastTimeout, "success", {
      showTop: true
    });
  }

  render() {
    const { className, icon } = this.props;
    return (
      <div>
        <button className={`button ${className}`} onClick={this.onClick}>
          <MetroIcon icon={icon} /> Copy to clipboard
        </button>
      </div>
    );
  }
}

CopyLogsButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  logsData: PropTypes.arrayOf(PropTypes.object).isRequired,
  polyglot: pPropType.isRequired
};

CopyLogsButton.defaultProps = {
  className: "",
  icon: "copy"
};

function mapStateToProps(state) {
  return {
    logsData: selectSimulationLogs(state),
    polyglot: getP(state)
  };
}

export default connect(mapStateToProps)(CopyLogsButton);
