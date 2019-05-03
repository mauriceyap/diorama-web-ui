import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

import { metroIconSize } from "../../customPropTypes";
import { noop } from "../../utils";

export default class MetroIcon extends Component {
  render() {
    const { icon, colour, size, style, onClick } = this.props;
    const className = classnames(`mif-${icon}`, {
      [`mif-${size}`]: !!size,
      [`fg-${colour}`]: !!colour
    });
    return <span className={className} style={style} onClick={onClick} />;
  }
}

MetroIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  colour: PropTypes.string,
  size: metroIconSize,
  style: PropTypes.object,
  onClick: PropTypes.func
};

MetroIcon.defaultProps = {
  colour: undefined,
  size: undefined,
  style: {},
  onClick: noop
};
