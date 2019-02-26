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
import { braceEditorModes } from "../constants";

class EditCodeData extends Component {
  render() {
    const {
      selectedSource,
      polyglot,
      programName,
      colourScheme,
      runtime,
      gitRepositoryUrl,
      rawCode,
      onGitRepositoryUrlChange,
      onRawCodeChange,
      onSelectedZipFileChange,
      zipFileName
    } = this.props;
    if (selectedSource === "git") {
      return (
        <form key={polyglot.tc("repositoryUrl")}>
          <input
            type="url"
            data-role="input"
            data-prepend={`${polyglot.tc("repositoryUrl")}:`}
            onChange={onGitRepositoryUrlChange}
            value={gitRepositoryUrl}
          />
        </form>
      );
    } else if (selectedSource === "zip") {
      // TODO: upload files
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
          {zipFileName && <p>{polyglot.tc("selectedFile")}: {zipFileName}</p>}
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
  gitRepositoryUrl: PropTypes.string.isRequired,
  rawCode: PropTypes.string.isRequired,
  onGitRepositoryUrlChange: PropTypes.func.isRequired,
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
