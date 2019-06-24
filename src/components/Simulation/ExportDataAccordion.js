import React, { Component } from "react";
import DownloadLogsButton from "./DownloadLogsButton";
import CopyLogsButton from "./CopyLogsButton";
import { connect } from "react-redux";
import { getP } from "redux-polyglot";
import { pPropType } from "../../customPropTypes";

class ExportDataAccordion extends Component {
  render() {
    const { polyglot } = this.props;
    return (
      <div
        data-role="accordion"
        data-one-frame={false}
        data-show-active={true}
        className="mt-3 mb-3"
      >
        <div className="frame border bd-lightGray active">
          <div
            className="heading"
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <h5>{polyglot.tc("simulation.exportData")}</h5>
          </div>
          <div className="content">
            <div
              style={{ display: "flex", justifyContent: "space-around" }}
              className="mt-2 mb-2"
            >
              <DownloadLogsButton
                className={"bg-blue fg-white"}
                fileFormat={"CSV"}
              />
              <DownloadLogsButton
                className={"bg-darkBlue fg-white"}
                fileFormat={"JSON"}
              />
              <CopyLogsButton className="bg-grayBlue fg-white" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ExportDataAccordion.propTypes = {
  polyglot: pPropType.isRequired
};

function mapStateToProps(state) {
  return {
    polyglot: getP(state)
  };
}

export default connect(mapStateToProps)(ExportDataAccordion);
