import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProgramCard from "./ProgramCard";
import { selectPrograms } from "../../reduxStore/selectors";
import { pPropType, programPropType } from "../../customPropTypes";
import MetroIcon from "../MetroIcon";
import NewProgramWizard from "./NewProgramWizard";
import { addProgram } from "../../reduxStore/programs/reducer";
import { getP } from "redux-polyglot";
import { defaultCodeData, defaultCodeSource, defaultDescription, defaultMainHandler } from "./constants";
import { Redirect } from "react-router-dom";
import Socket from "../../Socket";
import SocketEvents from "../../SocketEvents";

const initialState = {
  isNewProgramWizardVisible: false,
  redirectToProgramPage: undefined
};

class Programs extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    Socket.send(SocketEvents.GET_PROGRAMS);
    this.renderProgramCards = this.renderProgramCards.bind(this);
    this.showNewProgramWizard = this.showNewProgramWizard.bind(this);
    this.onNewProgramWizardCancel = this.onNewProgramWizardCancel.bind(this);
    this.onNewProgramWizardSubmit = this.onNewProgramWizardSubmit.bind(this);
  }

  showNewProgramWizard() {
    this.setState({
      isNewProgramWizardVisible: true
    });
  }

  onNewProgramWizardCancel() {
    this.setState({
      isNewProgramWizardVisible: false
    });
  }

  onNewProgramWizardSubmit(runtime, name) {
    const { dispatch } = this.props;
    const newProgram = {
      runtime,
      name,
      codeSource: defaultCodeSource,
      codeData: defaultCodeData,
      lastEdited: new Date().getTime(),
      description: defaultDescription,
      mainHandler: defaultMainHandler
    };
    dispatch(
      addProgram(newProgram)
    );
    Socket.send(SocketEvents.ADD_PROGRAM, newProgram);
    this.setState({
      isNewProgramWizardVisible: false,
      redirectToProgramPage: name
    });
  }

  renderProgramCards() {
    const { programs } = this.props;
    return programs.map(
      ({ name, runtime, codeSource, lastEdited, description }) => (
        <ProgramCard
          key={name}
          name={name}
          runtime={runtime}
          description={description}
          codeSource={codeSource}
          lastEdited={lastEdited}
        />
      )
    );
  }

  render() {
    const { isNewProgramWizardVisible, redirectToProgramPage } = this.state;
    const { p } = this.props;
    if (redirectToProgramPage) {
      return <Redirect to={`/programs/${redirectToProgramPage}`} />;
    }
    return (
      <Fragment>
        <span className={"display1"}>{p.tc("programs")}</span>
        {isNewProgramWizardVisible || (
          <p style={{ textAlign: "right" }}>
            <button
              className="button success"
              onClick={this.showNewProgramWizard}
            >
              <MetroIcon icon={"plus"} /> {p.tc("newProgram")}
            </button>
          </p>
        )}

        {isNewProgramWizardVisible && (
          <NewProgramWizard
            submitCb={this.onNewProgramWizardSubmit}
            cancelCb={this.onNewProgramWizardCancel}
          />
        )}

        <div className="grid">
          <div className="row">{this.renderProgramCards()}</div>
        </div>
      </Fragment>
    );
  }
}

Programs.propTypes = {
  programs: PropTypes.arrayOf(programPropType).isRequired,
  dispatch: PropTypes.func.isRequired,
  p: pPropType.isRequired
};

function mapStateToProps(state) {
  return {
    programs: selectPrograms(state),
    p: getP(state)
  };
}

export default connect(mapStateToProps)(Programs);
