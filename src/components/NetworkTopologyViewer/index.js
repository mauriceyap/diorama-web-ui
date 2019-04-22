import React, { Component, createRef, Fragment } from "react";
import PropTypes from "prop-types";
import { Network } from "vis";
import {
  selectConnectionParameters,
  selectNetworkTopology
} from "../../reduxStore/selectors";
import { connect } from "react-redux";
import Metro from "metro4";
import { getP } from "redux-polyglot";
import { pPropType } from "../../customPropTypes";
import ConnectionParametersEditorDialog from "./ConnectionParametersEditorDialog";
import { connectionParametersEditorDialogId } from "../../styleConstants";
import {
  setConnectionParametersEditorDelayDistribution,
  setConnectionParametersEditorDelayDistributionParameters,
  setConnectionParametersEditorFromNid,
  setConnectionParametersEditorSuccessRate,
  setConnectionParametersEditorToNid
} from "../../reduxStore/editingConnectionParameters/reducer";

const style = {
  width: "100%"
};

class Index extends Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
    this.assembleNetwork = this.assembleNetwork.bind(this);
  }

  assembleNetwork() {
    const { topology, dispatch, connectionParameters } = this.props;
    const nodes = topology.map(({ nid, program }) => ({
      id: nid,
      label: `${nid}\n<i>(${program})</i>`,
      font: { multi: "html" },
      group: program
    }));

    const edges = topology
      .map(({ connections, nid }) =>
        connections
          .map(connection =>
            nid >= connection
              ? [
                  {
                    from: nid,
                    to: connection,
                    id: `connection-${nid}-${connection}`
                  }
                ]
              : []
          )
          .flat()
      )
      .flat();
    const options = {
      nodes: { shape: "box", margin: 10 }
    };
    const network = new Network(this.ref.current, { nodes, edges }, options);
    network.on("doubleClick", ({ edges }) => {
      if (edges.length !== 1) {
        return;
      }
      const edgeNids = edges[0]
        .match(
          /connection-([a-zA-Z0-9][a-zA-Z0-9_.-]+)-([a-zA-Z0-9][a-zA-Z0-9_.-]+)/
        )
        .slice(1, 3)
        .sort();
      const fromNid = edgeNids[0];
      const toNid = edgeNids[1];
      const existingParameters =
        connectionParameters[fromNid] && connectionParameters[fromNid][toNid]
          ? connectionParameters[fromNid][toNid]
          : {};
      dispatch(setConnectionParametersEditorFromNid(fromNid));
      dispatch(setConnectionParametersEditorToNid(toNid));
      dispatch(
        setConnectionParametersEditorSuccessRate(existingParameters.successRate)
      );
      dispatch(
        setConnectionParametersEditorDelayDistribution(
          existingParameters.delayDistribution
        )
      );
      dispatch(
        setConnectionParametersEditorDelayDistributionParameters(
          existingParameters.delayDistributionParameters
        )
      );
      Metro.dialog.open(`#${connectionParametersEditorDialogId}`);
    });
    this.network = network;
  }

  render() {
    const { height } = this.props;
    return (
      <Fragment>
        <div
          style={{ ...style, height }}
          ref={this.ref}
          className="border bd-lightGray"
        />
        <ConnectionParametersEditorDialog />
      </Fragment>
    );
  }

  componentDidMount() {
    this.assembleNetwork();
  }

  componentDidUpdate() {
    this.assembleNetwork();
  }
}

Index.propTypes = {
  topology: PropTypes.arrayOf(PropTypes.object),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  polyglot: pPropType.isRequired,
  dispatch: PropTypes.func.isRequired,
  connectionParameters: PropTypes.object.isRequired
};

Index.defaultProps = {
  topology: [],
  height: "50rem"
};

function mapStateToProps(state) {
  return {
    topology: selectNetworkTopology(state).unpackedNetworkTopology,
    polyglot: getP(state),
    connectionParameters: selectConnectionParameters(state)
  };
}

export default connect(mapStateToProps)(Index);
