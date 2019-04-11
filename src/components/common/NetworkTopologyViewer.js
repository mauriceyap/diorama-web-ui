import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import { Network } from "vis";
import { selectNetworkTopology } from "../../reduxStore/selectors";
import { connect } from "react-redux";

const style = {
  width: "100%"
};

class NetworkTopologyViewer extends Component {
  constructor() {
    super();
    this.network = {};
    this.ref = createRef();
    this.state = { nodes: [], edges: [] };
  }

  componentDidUpdate(prevProps, prevState) {
    const { topology } = this.props;
    const nodes = topology.map(({ nid, program }) => ({
      id: nid,
      label: `${nid}\n<i>(${program})</i>`,
      font: { multi: 'html' },
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

    const { nodes: prevNodes, edges: prevEdges } = prevState;
    if (
      JSON.stringify(prevNodes) !== JSON.stringify(nodes) ||
      JSON.stringify(prevEdges) !== JSON.stringify(edges)
    ) {
      this.setState({ nodes, edges });
      const options = {
        groups: [...new Set(nodes.map(({ program }) => program))].reduce(
          (acc, program) => ({ ...acc, [program]: {} })
        ),
        nodes: { shape: "box", margin: 10 }
      };
      this.network = new Network(this.ref.current, { nodes, edges }, options);
    }
  }

  render() {
    const { nodes } = this.state;
    const { height } = this.props;
    return nodes.length > 0 ? (
      <div
        style={{ ...style, height }}
        ref={this.ref}
        className="border bd-lightGray"
      />
    ) : (
      <span ref={this.ref} />
    );
  }
}

NetworkTopologyViewer.propTypes = {
  topology: PropTypes.arrayOf(PropTypes.object),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

NetworkTopologyViewer.defaultProps = {
  topology: [],
  height: "50rem"
};

function mapStateToProps(state) {
  return {
    topology: selectNetworkTopology(state).unpackedNetworkTopology
  };
}

export default connect(mapStateToProps)(NetworkTopologyViewer);
