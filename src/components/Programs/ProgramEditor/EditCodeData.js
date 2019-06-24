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
import "brace/mode/text";
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
      rawCodeDependencies,
      onGitRepositoryUrlChange,
      onGitCheckoutBranchOrTagChange,
      onRawCodeChange,
      onRawCodeDependenciesChange,
      onSelectedZipFileChange,
      zipFileName
    } = this.props;
    if (selectedSource === "git") {
      const { repositoryUrl, checkoutBranchOrTag } = gitRepository;
      return (
        <form key={polyglot.tc("programs.repositoryUrl")}>
          <p>
            Give the HTTP URL of the repository, as if you were cloning it. It
            should end in <code>.git</code> - something like{" "}
            <code>https://somegithost.com/you/your_project.git</code>.
          </p>
          <input
            type="url"
            data-role="input"
            data-prepend={`${polyglot.tc("programs.repositoryUrl")}:`}
            onChange={onGitRepositoryUrlChange}
            value={repositoryUrl}
          />
          <input
            type="text"
            data-role="input"
            data-prepend={`${polyglot.tc("programs.checkoutBranchOrTag")}:`}
            onChange={onGitCheckoutBranchOrTagChange}
            value={checkoutBranchOrTag}
          />
        </form>
      );
    } else if (selectedSource === "zip") {
      return (
        <Fragment>
          <form key={polyglot.tc("programs.chooseZipFile")}>
            <input
              type="file"
              data-role="file"
              data-button-title={polyglot.tc("programs.chooseZipFile")}
              accept={".zip,.ZIP"}
              onChange={onSelectedZipFileChange}
            />
          </form>
          {zipFileName && zipFileName !== existingUploadingFileName && (
            <p>
              {polyglot.tc("programs.selectedFile")}: {zipFileName}
            </p>
          )}
          {zipFileName === existingUploadingFileName && (
            <p>{polyglot.tc("programs.existingUploadedFile")}</p>
          )}
        </Fragment>
      );
    }
    return (
      <div className="mt-2">
        <h6>{polyglot.tc("programs.code")}</h6>
        <AceEditor
          name={`editor${programName}`}
          theme={colours.aceEditorTheme[colourScheme]}
          mode={braceEditorModes[runtime]}
          value={rawCode}
          onChange={onRawCodeChange}
          width={"100%"}
          editorProps={{
            $blockScrolling: Infinity
          }}
        />
        <div className="mt-6" />
        <h6>{polyglot.tc("programs.dependencies")}</h6>
        <p>{polyglot.tc(`programs.dependenciesInputInformation.${runtime}`)}</p>
        <AceEditor
          name={`editorDependencies${programName}`}
          width={"100%"}
          height="10rem"
          mode="text"
          theme={colours.aceEditorTheme[colourScheme]}
          onChange={onRawCodeDependenciesChange}
          value={rawCodeDependencies}
        />
      </div>
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
  rawCodeDependencies: PropTypes.string.isRequired,
  onGitRepositoryUrlChange: PropTypes.func.isRequired,
  onGitCheckoutBranchOrTagChange: PropTypes.func.isRequired,
  onSelectedZipFileChange: PropTypes.func.isRequired,
  onRawCodeChange: PropTypes.func.isRequired,
  onRawCodeDependenciesChange: PropTypes.func.isRequired,
  zipFileName: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    colourScheme: selectCustomisation(state).colourScheme
  };
}

export default connect(mapStateToProps)(EditCodeData);
