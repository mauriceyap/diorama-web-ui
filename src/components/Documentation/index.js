import React, { Component } from "react";
import { runtimeLabels } from "../Programs/constants";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getP } from "redux-polyglot";
import { pPropType } from "../../customPropTypes";

const programDocumentationList = ["python3"];

const networkDocumentationList = ["JSON", "YAML"];

class Documentation extends Component {
  render() {
    const { polyglot } = this.props;
    return (
      <div>
        <h1>{polyglot.tc("documentation.documentation")}</h1>
        <p className={"mb-6"}>{polyglot.t("documentation.intro")}</p>
        <h2>{polyglot.tc("documentation.nodeProgramAPI")}</h2>
        <ul>
          {programDocumentationList.map(runtime => (
            <li>
              <Link to={`/docs/program-${runtime}`}>
                {runtimeLabels[runtime]}
              </Link>
            </li>
          ))}
        </ul>
        <h2>{polyglot.tc("documentation.networkTopologyAPI")}</h2>
        <ul>
          {networkDocumentationList.map(language => (
            <li>
              <Link to={`/docs/network-${language}`}>{language}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    const { polyglot } = this.props;
    document.title = `Diorama - ${polyglot.tc("documentation.documentation")}`;
  }
}

Documentation.propTypes = {
  polyglot: pPropType.isRequired
};

function mapStateToProps(state) {
  return {
    polyglot: getP(state)
  };
}

export default connect(mapStateToProps)(Documentation);
