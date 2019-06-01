import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Steps, Hints } from "intro.js-react";

import { selectCustomisation } from "../../reduxStore/selectors";
import colours from "../../customisation/colours";

const topDivStyle = {
  paddingTop: "7rem",
  paddingBottom: "7rem"
};

const commonDisplayLineStyle = { textAlign: "center" };

const displayLine1Style = {
  ...commonDisplayLineStyle,
  fontSize: "5rem",
  fontWeight: 100
};

const displayLine2Style = {
  ...commonDisplayLineStyle,
  fontSize: "1.5rem",
  fontWeight: 200,
  marginTop: "2rem"
};

const bottomDivParagraphStyle = {
  fontSize: "1.5rem",
  fontWeight: 600,
  marginBottom: "2rem"
};

const steps = [
  {
    element: ".intro-step-zero",
    intro:
      "Familiarise yourself with Diorama's model, how to write node programs and how to define your network topology."
  },
  {
    element: ".intro-step-one",
    intro: "Create programs for the nodes in your network."
  },
  {
    element: ".intro-step-two",
    intro:
      "Define the shape of your network - what nodes you have, what programs they run and how they're connected."
  },
  {
    element: ".intro-step-three",
    intro:
      "Run the nodes in your network and view the output from your simulation."
  }
];

class ProjectHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepsEnabled: false
    };

    this.enableSteps = this.enableSteps.bind(this);
    this.disableSteps = this.disableSteps.bind(this);
  }

  enableSteps() {
    this.setState({
      stepsEnabled: true
    });
  }

  disableSteps() {
    this.setState({
      stepsEnabled: false
    });
  }

  render() {
    const { colourScheme } = this.props;
    const { stepsEnabled } = this.state;
    return (
      <Fragment>
        <Steps
          enabled={stepsEnabled}
          initialStep={0}
          steps={steps}
          onExit={this.disableSteps}
        />
        <div
          className={`container-fluid bg-${
            colours.homePageTopDivBackground[colourScheme]
          } fg-${colours.homePageTopDivForeground[colourScheme]}`}
          style={topDivStyle}
        >
          <div className="container">
            <div style={displayLine1Style}>Welcome to Diorama</div>
            <div style={displayLine2Style}>
              Simulate your own distributed algorithms on your own network
              topology
            </div>
          </div>
        </div>
        <div
          className={`bg-${
            colours.homePageBottomDivBackground[colourScheme]
          } fg-${colours.homePageBottomDivForeground[colourScheme]}`}
          style={{ textAlign: "center" }}
        >
          <div className="grid container">
            <div className="row pt-20 pb-20">
              <div className="cell-lg-6 p-12">
                <div>
                  <p style={bottomDivParagraphStyle}>
                    Learn how to use Diorama to create and run your first
                    simulation
                  </p>
                  <button
                    className="button primary large"
                    onClick={this.enableSteps}
                  >
                    Show me how!
                  </button>
                </div>
              </div>
              <div className="cell-lg-6 p-12">
                <div>
                  <p style={bottomDivParagraphStyle}>
                    Read the documentation for writing node programs and
                    defining your network topology
                  </p>
                  <button className="button secondary large intro-step-zero">
                    Take me there!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  componentDidMount() {
    document.title = "Diorama - Home";
  }
}

ProjectHome.propTypes = {};

function mapStateToProps(state) {
  return {
    colourScheme: selectCustomisation(state).colourScheme
  };
}

export default connect(mapStateToProps)(ProjectHome);
