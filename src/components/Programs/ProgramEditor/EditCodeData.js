import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AceEditor from "react-ace";
import { selectCustomisation } from "../../../reduxStore/selectors";
import colours from "../../../customisation/colours";

import "brace/theme/tomorrow";
import "brace/theme/monokai";

import "brace/mode/python";
import "brace/mode/elixir";
import "brace/mode/scala";
import { braceEditorModes, existingUploadingFileName } from "../constants";
import { gitRepositoryDataPropType } from "../../../customPropTypes";

class EditCodeData extends Component {
  render() {
    const {
      selectedSource,
      polyglot,
      programName,
      colourScheme,
      runtime,
      gitRepository,
      rawCode,
      onGitRepositoryUrlChange,
      onGitCheckoutBranchOrTagChange,
      onRawCodeChange,
      onSelectedZipFileChange,
      zipFileName
    } = this.props;
    if (selectedSource === "git") {
      const { repositoryUrl, checkoutBranchOrTag } = gitRepository;
      return (
        <form key={polyglot.tc("repositoryUrl")}>
          <input
            type="url"
            data-role="input"
            data-prepend={`${polyglot.tc("repositoryUrl")}:`}
            onChange={onGitRepositoryUrlChange}
            value={repositoryUrl}
          />
          <input
            type="text"
            data-role="input"
            data-prepend={`${polyglot.tc("checkoutBranchOrTag")}:`}
            onChange={onGitCheckoutBranchOrTagChange}
            value={checkoutBranchOrTag}
          />
        </form>
      );
    } else if (selectedSource === "zip") {
      return (
        <Fragment>
          <form key={polyglot.tc("chooseZipFile")}>
            <input
              type="file"
              data-role="file"
              data-button-title={polyglot.tc("chooseZipFile")}
              accept={".zip,.ZIP"}
              onChange={onSelectedZipFileChange}
            />
          </form>
          {zipFileName && zipFileName !== existingUploadingFileName && (
            <p>
              {polyglot.tc("selectedFile")}: {zipFileName}
            </p>
          )}
          {zipFileName === existingUploadingFileName && (
            <p>{polyglot.tc("existingUploadedFile")}</p>
          )}
        </Fragment>
      );
    }
    return (
      <AceEditor
        name={`editor${programName}`}
        theme={colours.aceEditorTheme[colourScheme]}
        mode={braceEditorModes[runtime]}
        value={rawCode}
        onChange={onRawCodeChange}
        editorProps={{
          $blockScrolling: Infinity
        }}
      />
    );
  }
}

EditCodeData.propTypes = {
  selectedSource: PropTypes.string.isRequired,
  polyglot: PropTypes.object.isRequired,
  programName: PropTypes.string.isRequired,
  colourScheme: PropTypes.string.isRequired,
  runtime: PropTypes.string.isRequired,
  gitRepository: gitRepositoryDataPropType.isRequired,
  rawCode: PropTypes.string.isRequired,
  onGitRepositoryUrlChange: PropTypes.func.isRequired,
  onGitCheckoutBranchOrTagChange: PropTypes.func.isRequired,
  onSelectedZipFileChange: PropTypes.func.isRequired,
  onRawCodeChange: PropTypes.func.isRequired,
  zipFileName: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    colourScheme: selectCustomisation(state).colourScheme
  };
}

export default connect(mapStateToProps)(EditCodeData);
