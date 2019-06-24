import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Metro from "metro4";
import {
  codeSourceIcons,
  codeSourceLabels,
  runtimeIcons,
  runtimeLabels
} from "./constants";
import { deleteProgram } from "../../reduxStore/programs/reducer";
import { pPropType } from "../../customPropTypes";
import { getP } from "redux-polyglot";
import { Redirect } from "react-router-dom";
import { pointerCursorOnHoverStyle } from "../../utils";
import DateTime from "../common/DateTime";
import Socket from "../../Socket";
import SocketEvents from "../../SocketEvents";

const initialState = {
  redirectToProgramPage: false
};

class ProgramCard extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
    this.requestConfirmDeleteProgram = this.requestConfirmDeleteProgram.bind(
      this
    );
    this.redirectToProgramPage = this.redirectToProgramPage.bind(this);
  }

  redirectToProgramPage() {
    this.setState({ redirectToProgramPage: true });
  }

  requestConfirmDeleteProgram() {
    const { dispatch, name, p } = this.props;
    Metro.dialog.create({
      title: p.tc("programs.areYouSureYouWantToDeleteProgram", { name }),
      content: `<p>${p.tc("programs.itWillBeLostForever")}</p>`,
      actions: [
        {
          caption: p.t("programs.yesIAmSure"),
          cls: "js-dialog-close alert",
          onclick() {
            Socket.send(SocketEvents.DELETE_PROGRAM, name);
            dispatch(deleteProgram(name));
          }
        },
        {
          caption: p.t("programs.noIDoNot"),
          cls: "js-dialog-close"
        }
      ]
    });
  }

  render() {
    const { redirectToProgramPage } = this.state;
    const {
      name,
      runtime,
      description,
      codeSource,
      lastEdited,
      p
    } = this.props;
    if (redirectToProgramPage)
      return <Redirect push to={`/programs/${name}`} />;

    const runtimeIcon = runtimeIcons[runtime];
    const codeSourceIcon = codeSourceIcons[codeSource];
    const codeSourceLabel = codeSourceLabels[codeSource];
    return (
      <div className="cell-xl-3 cell-lg-4 cell-md-6">
        <div className="card">
          <div
            className="card-header"
            onClick={this.redirectToProgramPage}
            style={pointerCursorOnHoverStyle}
          >
            <div className="avatar">
              <img src={runtimeIcon} alt={runtime} />
            </div>
            <div className="name">{name}</div>
            <div className="date">
              {p.t("programs.lastModified")}{" "}
              <DateTime format={"LLL"} dateTime={lastEdited} />
            </div>
          </div>
          <div
            className="card-content p-4"
            onClick={this.redirectToProgramPage}
            style={pointerCursorOnHoverStyle}
          >
            <p>{description}</p>
            <p>
              <span className={"text-ultralight"}>
                {p.tc("programs.runtime")}: {runtimeLabels[runtime]}
              </span>
            </p>
          </div>
          <div className="card-footer">
            <span className={"text-ultralight"}>
              {p.tc(`programs.${codeSourceLabel}`)}
            </span>
            <div
              style={{
                float: "right",
                width: "1.5rem",
                height: "1.5rem"
              }}
            >
              <img
                style={{ width: "100%", minHeight: "100%" }}
                src={codeSourceIcon}
                alt={codeSource}
              />
            </div>
          </div>
          <div className="card-footer">
            <button
              className="flat-button mif-bin fg-lightCrimson"
              onClick={this.requestConfirmDeleteProgram}
            />
            <button
              className="flat-button mif-pencil"
              onClick={this.redirectToProgramPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

ProgramCard.propTypes = {
  name: PropTypes.string.isRequired,
  runtime: PropTypes.string.isRequired,
  codeSource: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  lastEdited: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  p: pPropType.isRequired
};

function mapStateToProps(state) {
  return {
    p: getP(state)
  };
}

export default connect(mapStateToProps)(ProgramCard);
