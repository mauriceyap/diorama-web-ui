import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Steps } from "intro.js-react";

import { selectCustomisation } from "../../reduxStore/selectors";
import colours from "../../customisation/colours";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { pPropType } from "../../customPropTypes";
import { getP } from "redux-polyglot";

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
    const { colourScheme, polyglot } = this.props;
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
            <div style={displayLine1Style}>{polyglot.t("home.welcome")}</div>
            <div style={displayLine2Style}>{polyglot.t("home.intro")}</div>
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
                    {polyglot.t("home.learn")}
                  </p>
                  <button
                    className="button primary large"
                    onClick={this.enableSteps}
                  >
                    {polyglot.t("home.showMeHow")}
                  </button>
                </div>
              </div>
              <div className="cell-lg-6 p-12">
                <div>
                  <p style={bottomDivParagraphStyle}>
                    {polyglot.t("home.read")}
                  </p>
                  <Link to={"/docs"}>
                    <button className="button secondary large">
                      {polyglot.t("home.takeMeThere")}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p style={{ textAlign: "center" }}>&copy; Maurice Yap 2019.</p>
      </Fragment>
    );
  }

  componentDidMount() {
    document.title = "Diorama - Home";
  }
}

ProjectHome.propTypes = {
  colourScheme: PropTypes.string.isRequired,
  polyglot: pPropType.isRequired
};

function mapStateToProps(state) {
  return {
    colourScheme: selectCustomisation(state).colourScheme,
    polyglot: getP(state)
  };
}

export default connect(mapStateToProps)(ProjectHome);
