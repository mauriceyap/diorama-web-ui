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

const initialState = {
  program: null,
  redirectToProgramsPage: false
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
      redirectToProgramsPage: !programs
        .map(({ name }) => name)
        .contains(programName),
      programState: savedProgram,
      editingCodeData: {
        git:
          savedProgram && savedProgram.codeSource === "git"
            ? savedProgram.codeData
            : "",
        zip: null,
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
    this.onRawCodeChange = this.onRawCodeChange.bind(this);
  }

  onGitRepositoryUrlChange({ target: { value } }) {
    const {
      editingCodeData: originalEditingCodeData,
      programState: originalProgramState
    } = this.state;
    this.setState({
      editingCodeData: { ...originalEditingCodeData, git: value },
      programState: { ...originalProgramState, codeData: value }
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
    const { programState } = this.state;
    const changesWithNameAndLastEdited = {
      name: programState.name,
      lastEdited: new Date().getTime(),
      ...this.getChanges()
    };
    Socket.send(SocketEvents.MODIFY_PROGRAM, changesWithNameAndLastEdited);
    dispatch(modifyProgram(changesWithNameAndLastEdited));
    this.redirectToProgramsPage();
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
      programState: { ...existingProgramState, mainHandler: value }
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
      editingCodeData: { raw: rawCode, git: gitRepositoryUrl }
    } = this.state;

    return !redirectToProgramsPage ? (
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
              gitRepositoryUrl={gitRepositoryUrl}
              onGitRepositoryUrlChange={this.onGitRepositoryUrlChange}
              onRawCodeChange={this.onRawCodeChange}
            />
          </div>
          <div className="mt-6">
            <EditMainHandler
              polyglot={p}
              onChange={this.setMainHandler}
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
    ) : (
      <Redirect to="/programs" />
    );
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
