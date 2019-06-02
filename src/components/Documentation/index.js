import React, { Component } from "react";
import { runtimeLabels } from "../Programs/constants";
import { Link } from "react-router-dom";

const programDocumentationList = ["python3"];

const networkDocumentationList = ["JSON", "YAML"];

export default class Documentation extends Component {
  render() {
    return (
      <div>
        <h1>Documentation</h1>
        <p className={"mb-6"}>
          Reference pages for our interfaces for writing node programs and
          defining your own network topology.
        </p>
        <h2>Node program API</h2>
        <ul>
          {programDocumentationList.map(runtime => (
            <li>
              <Link to={`/docs/program-${runtime}`}>
                {runtimeLabels[runtime]}
              </Link>
            </li>
          ))}
        </ul>
        <h2>Network topology API</h2>
        <ul>
          {networkDocumentationList.map(language => (
            <li>
              <Link to={`/docs/network-${language}`}>
                {language}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
