import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MetroIcon from "../MetroIcon";
import { selectSimulationLogs } from "../../reduxStore/selectors";

class CopyLogsButton extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { logsData } = this.props;
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
  logsData: PropTypes.arrayOf(PropTypes.object).isRequired
};

CopyLogsButton.defaultProps = {
  className: "",
  icon: "copy"
};

function mapStateToProps(state) {
  return {
    logsData: selectSimulationLogs(state)
  };
}

export default connect(mapStateToProps)(CopyLogsButton);
