import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { selectSimulationLogs } from "../../reduxStore/selectors";
import MetroIcon from "../MetroIcon";
import { getP } from "redux-polyglot";
import { pPropType } from "../../customPropTypes";

const createContentDataForFormat = {
  CSV(data) {
    return (
      "data:text/csv;charset=utf-8," +
      "nid,timestamp,message\n" +
      data
        .map(({ nid, timestamp, message }) => `${nid},${timestamp},${message}`)
        .join("")
    );
  },
  JSON(data) {
    return "data:application/json;charset=utf8," + JSON.stringify(data);
  }
};

class DownloadLogsButton extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { logsData, fileFormat } = this.props;
    const content = createContentDataForFormat[fileFormat](logsData);
    const encodedURI = encodeURI(content);
    const dummyLinkElement = document.createElement("a");
    dummyLinkElement.setAttribute("href", encodedURI);
    dummyLinkElement.setAttribute(
      "download",
      `logs.${fileFormat.toLowerCase()}`
    );
    document.body.appendChild(dummyLinkElement);
    dummyLinkElement.click();
    document.body.removeChild(dummyLinkElement);
  }

  render() {
    const { className, icon, fileFormat, polyglot } = this.props;
    return (
      <div>
        <button className={`button ${className}`} onClick={this.onClick}>
          <MetroIcon icon={icon} />{" "}
          {polyglot.tc(`simulation.download${fileFormat}`)}
        </button>
      </div>
    );
  }
}

DownloadLogsButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  fileFormat: PropTypes.oneOf(["JSON", "CSV"]).isRequired,
  logsData: PropTypes.arrayOf(PropTypes.object).isRequired,
  polyglot: pPropType.isRequired
};

DownloadLogsButton.defaultProps = {
  className: "",
  icon: "download"
};

function mapStateToProps(state) {
  return {
    logsData: selectSimulationLogs(state),
    polyglot: getP(state)
  };
}

export default connect(mapStateToProps)(DownloadLogsButton);
