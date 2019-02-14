import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  addProgram,
  deleteProgram,
  modifyProgram
} from "../../reduxStore/programs/reducer";

class Programs extends Component {
  render() {
    return (
      <Fragment>
        <span className={"display1"}>Programs</span>

        <button
          onClick={() =>
            this.props.dispatch(addProgram({ name: "abc", value: 123, a: 1 }))
          }
        >
          add abc
        </button>
        <button
          onClick={() =>
            this.props.dispatch(addProgram({ name: "def", value: 246, a: 4 }))
          }
        >
          add abc
        </button>
        <button
          onClick={() =>
            this.props.dispatch(modifyProgram({ name: "def", value: 0 }))
          }
        >
          add abc
        </button>
        <button onClick={() => this.props.dispatch(deleteProgram("abc"))}>
          del abc
        </button>

        <div className="grid">
          <div className="row">
            <div className="cell-xl-3 cell-lg-4 cell-md-6">
              <div className="card">
                <div className="card-header">Card header</div>
                <div className="card-content p-2">
                  Card with header and footer...
                </div>
                <div className="card-footer">Card Footer</div>
              </div>
            </div><div className="cell-xl-3 cell-lg-4 cell-md-6">
              <div className="card">
                <div className="card-header">Card header</div>
                <div className="card-content p-2">
                  Card with header and footer...
                </div>
                <div className="card-footer">Card Footer</div>
              </div>
            </div><div className="cell-xl-3 cell-lg-4 cell-md-6">
              <div className="card">
                <div className="card-header">Card header</div>
                <div className="card-content p-2">
                  Card with header and footer...
                </div>
                <div className="card-footer">Card Footer</div>
              </div>
            </div><div className="cell-xl-3 cell-lg-4 cell-md-6">
              <div className="card">
                <div className="card-header">Card header</div>
                <div className="card-content p-2">
                  Card with header and footer...
                </div>
                <div className="card-footer">Card Footer</div>
              </div>
            </div><div className="cell-xl-3 cell-lg-4 cell-md-6">
              <div className="card">
                <div className="card-header">Card header</div>
                <div className="card-content p-2">
                  Card with header and footer...
                </div>
                <div className="card-footer">Card Footer</div>
              </div>
            </div><div className="cell-xl-3 cell-lg-4 cell-md-6">
              <div className="card">
                <div className="card-header">Card header</div>
                <div className="card-content p-2">
                  Card with header and footer...
                </div>
                <div className="card-footer">Card Footer</div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect()(Programs);
