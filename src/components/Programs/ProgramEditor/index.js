import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getP } from "redux-polyglot";
import { pPropType, programPropType } from "../../../customPropTypes";
import { Link, Redirect } from "react-router-dom";
import { selectPrograms } from "../../../reduxStore/selectors";
import { runtimes, fieldsToCheckDifference } from "../constants";
import { onChangeProgramRuntime } from "../../../styleConstants";
import MetroIcon from "../../MetroIcon";
import EditCodeSource from "./EditCodeSource";
import EditRuntime from "./EditRuntime";
import EditDescription from "./EditDescription";
import EditMainHandler from "./EditMainHandler";
import { modifyProgram } from "../../../reduxStore/programs/reducer";
import Socket from "../../../Socket";
import SocketEvents from "../../../SocketEvents";
import EditCodeData from "./EditCodeData";
import { uploadZipFile } from "../../../HTTPServer";

const initialState = {
  program: null,
  redirectToProgramsPage: false,
  isLoading: true
};

class ProgramEditor extends Component {
  constructor(props) {
    super(props);
    const {
      programs,
      match: {
        params: { programName }
      }
    } = this.props;

    const savedProgram = programs.filter(({ name }) => name === programName)[0];

    this.state = {
      ...initialState,
      programState: savedProgram,
      editingCodeData: {
        git:
          savedProgram && savedProgram.codeSource === "git"
            ? savedProgram.codeData
            : { repositoryUrl: "", checkoutBranchOrTag: "master" },
        zip:
          savedProgram && savedProgram.codeSource === "zip"
            ? savedProgram.codeData
            : "",
        raw:
          savedProgram && savedProgram.codeSource === "raw"
            ? savedProgram.codeData
            : ""
      }
    };

    this.setCodeSource = this.setCodeSource.bind(this);
    window[onChangeProgramRuntime] = this.setRuntime.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.setMainHandler = this.setMainHandler.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.getChanges = this.getChanges.bind(this);
    this.isProgramChanged = this.isProgramChanged.bind(this);
    this.redirectToProgramsPage = this.redirectToProgramsPage.bind(this);
    this.onGitRepositoryUrlChange = this.onGitRepositoryUrlChange.bind(this);
    this.onGitCheckoutBranchOrTagChange = this.onGitCheckoutBranchOrTagChange.bind(
      this
    );
    this.onRawCodeChange = this.onRawCodeChange.bind(this);
    this.onSelectedZipFileChange = this.onSelectedZipFileChange.bind(this);
  }

  onSelectedZipFileChange({ target: { files } }) {
    if (files.length < 1) {
      return;
    }
    const {
      editingCodeData: originalEditingCodeData,
      programState: originalProgramState
    } = this.state;
    this.setState({
      editingCodeData: { ...originalEditingCodeData, zip: files[0].name },
      programState: { ...originalProgramState, codeData: files[0].name },
      selectedZipFile: files[0]
    });
  }

  onGitRepositoryUrlChange({ target: { value } }) {
    const {
      editingCodeData: originalEditingCodeData,
      programState: originalProgramState
    } = this.state;
    const { git: originalEditingGitData } = originalEditingCodeData;
    const { codeData: originalProgramStateGitData } = originalProgramState;
    this.setState({
      editingCodeData: {
        ...originalEditingCodeData,
        git: { ...originalEditingGitData, repositoryUrl: value }
      },
      programState: {
        ...originalProgramState,
        codeData: { ...originalProgramStateGitData, repositoryUrl: value }
      }
    });
  }

  onGitCheckoutBranchOrTagChange({ target: { value } }) {
    const {
      editingCodeData: originalEditingCodeData,
      programState: originalProgramState
    } = this.state;
    const { git: originalEditingGitData } = originalEditingCodeData;
    const { codeData: originalProgramStateGitData } = originalProgramState;
    this.setState({
      editingCodeData: {
        ...originalEditingCodeData,
        git: { ...originalEditingGitData, checkoutBranchOrTag: value }
      },
      programState: {
        ...originalProgramState,
        codeData: { ...originalProgramStateGitData, checkoutBranchOrTag: value }
      }
    });
  }

  onRawCodeChange(raw) {
    const {
      editingCodeData: originalEditingCodeData,
      programState: originalProgramState
    } = this.state;
    this.setState({
      editingCodeData: { ...originalEditingCodeData, raw },
      programState: { ...originalProgramState, codeData: raw }
    });
  }

  redirectToProgramsPage() {
    this.setState({ redirectToProgramsPage: true });
  }

  saveChanges() {
    const { dispatch } = this.props;
    const { programState, selectedZipFile } = this.state;
    const processedChanges = {
      name: programState.name,
      lastEdited: new Date().getTime(),
      ...this.getChanges(),
      ...(programState.codeSource === "zip" ? { codeData: "" } : {})
    };

    const makeChanges = () => {
      Socket.send(SocketEvents.MODIFY_PROGRAM, processedChanges);
      dispatch(modifyProgram(processedChanges));
      this.redirectToProgramsPage();
    };

    if (programState.codeSource === "zip" && selectedZipFile) {
      this.setState({ isLoading: true });
      uploadZipFile(
        selectedZipFile,
        programState.name,
        () => {
          this.setState({ isLoading: false });
          makeChanges();
        },
        error => {
          console.error(error);
          this.setState({ redirectToProgramsPage: true });
        }
      );
    } else {
      makeChanges();
    }
  }

  getChanges() {
    const { programState } = this.state;
    const { programs } = this.props;
    const savedProgram = programs.filter(
      ({ name }) => name === programState.name
    )[0];
    return fieldsToCheckDifference.reduce((differences, fieldToCheck) => {
      const originalValue = savedProgram[fieldToCheck];
      const currentValue = programState[fieldToCheck];
      if (originalValue !== currentValue) {
        differences[fieldToCheck] = currentValue;
      }
      return differences;
    }, {});
  }

  isProgramChanged() {
    const changes = this.getChanges();
    return Object.entries(changes).length > 0;
  }

  setDescription({ target: { value } }) {
    const { programState: existingProgramState } = this.state;
    this.setState({
      programState: { ...existingProgramState, description: value }
    });
  }

  setCodeSource({ target: { value } }) {
    const { programState: existingProgramState, editingCodeData } = this.state;
    this.setState({
      programState: {
        ...existingProgramState,
        codeSource: value,
        codeData: editingCodeData[value]
      }
    });
  }

  setMainHandler({ target: { value } }) {
    const { programState: existingProgramState } = this.state;
    this.setState({
      programState: {
        ...existingProgramState,
        mainHandler: value
      }
    });
  }

  setRuntime(runtimeArray) {
    const { programState: existingProgramState } = this.state;
    this.setState({
      programState: { ...existingProgramState, runtime: runtimeArray[0] }
    });
  }

  render() {
    const {
      p,
      match: {
        params: { programName }
      }
    } = this.props;
    const {
      redirectToProgramsPage,
      programState,
      editingCodeData: { raw: rawCode, git: gitRepository, zip: zipFileName },
      isLoading
    } = this.state;

    if (redirectToProgramsPage) {
      return <Redirect to="/programs" />;
    }

    if (isLoading) {
      return <div data-role="activity" data-type="ring" />;
    }

    return (
      <Fragment>
        <span className={"display1"}>
          <Link to={"/programs"} className={"display1"}>
            {p.tc("programs")}
          </Link>{" "}
          > {programName}
        </span>
        <div className="border bd-lightGray border-size-2 p-4 mt-6">
          <div>
            <EditDescription
              polyglot={p}
              defaultValue={programState.description}
              onChange={this.setDescription}
            />
          </div>
          <div className="mt-6">
            <EditRuntime
              polyglot={p}
              defaultValue={programState.runtime}
              runtimes={runtimes}
            />
          </div>
          <div className="mt-6">
            <EditCodeSource
              polyglot={p}
              selectedValue={programState.codeSource}
              onChange={this.setCodeSource}
            />
            <EditCodeData
              key={programState.codeSource}
              selectedSource={programState.codeSource}
              polyglot={p}
              programName={programName}
              runtime={programState.runtime}
              rawCode={rawCode}
              gitRepository={gitRepository}
              onGitRepositoryUrlChange={this.onGitRepositoryUrlChange}
              onGitCheckoutBranchOrTagChange={
                this.onGitCheckoutBranchOrTagChange
              }
              onRawCodeChange={this.onRawCodeChange}
              onSelectedZipFileChange={this.onSelectedZipFileChange}
              zipFileName={zipFileName}
            />
          </div>
          <div className="mt-6">
            <EditMainHandler
              polyglot={p}
              onChange={this.setMainHandler}
              isRaw={programState.codeSource === "raw"}
              defaultValue={programState.mainHandler}
            />
          </div>
        </div>
        <div className="mt-4">
          {this.isProgramChanged() && (
            <button className="button primary" onClick={this.saveChanges}>
              <MetroIcon icon={"floppy-disk"} /> {p.tc("save")}
            </button>
          )}
          <button
            className="button light"
            onClick={this.redirectToProgramsPage}
          >
            <MetroIcon icon={"cancel"} /> {p.tc("cancel")}
          </button>
        </div>
      </Fragment>
    );
  }

  componentDidUpdate(prevProps) {
    const { programs: oldPrograms } = prevProps;
    const { programs } = this.props;
    const { programState } = this.state;
    if (programState || programs.length === oldPrograms.length) {
      return;
    }

    const {
      match: {
        params: { programName }
      }
    } = this.props;
    const savedProgram = programs.filter(({ name }) => name === programName)[0];

    this.setState({
      redirectToProgramsPage: !programs
        .map(({ name }) => name)
        .contains(programName),
      isLoading: false,
      programState: savedProgram,
      editingCodeData: {
        git:
          savedProgram && savedProgram.codeSource === "git"
            ? savedProgram.codeData
            : { repositoryUrl: "", checkoutBranchOrTag: "master" },
        zip:
          savedProgram && savedProgram.codeSource === "zip"
            ? savedProgram.codeData
            : "",
        raw:
          savedProgram && savedProgram.codeSource === "raw"
            ? savedProgram.codeData
            : ""
      }
    });
  }
}

ProgramEditor.propTypes = {
  p: pPropType.isRequired,
  match: PropTypes.object.isRequired,
  programs: PropTypes.arrayOf(programPropType).isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    p: getP(state),
    programs: selectPrograms(state)
  };
}

export default connect(mapStateToProps)(ProgramEditor);
