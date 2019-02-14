import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

import { metroIconSize } from "../../customPropTypes";

export default class MetroIcon extends Component {
  render() {
    const { icon, colour, size } = this.props;
    const className = classnames(`mif-${icon}`, {
      [`mif-${size}`]: !!size,
      [`fg-${colour}`]: !!colour
    });
    return <span className={className} />;
  }
}

MetroIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  colour: PropTypes.string,
  size: metroIconSize
};

MetroIcon.defaultProps = {
  colour: undefined,
  size: undefined
};
