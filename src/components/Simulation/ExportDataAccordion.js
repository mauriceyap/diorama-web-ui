import React from "react";
import DownloadLogsButton from "./DownloadLogsButton";
import CopyLogsButton from "./CopyLogsButton";

export default () => (
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
        <h5>Export Data</h5>
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
