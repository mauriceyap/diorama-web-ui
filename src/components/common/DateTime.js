import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import "moment/min/locales";

import { getLocale } from "redux-polyglot";

class DateTime extends Component {
  render() {
    const { locale, dateTime, format } = this.props;
    return (
      <Fragment>
        {moment(dateTime)
          .locale(locale)
          .format(format)}
      </Fragment>
    );
  }
}

DateTime.propTypes = {
  dateTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  locale: PropTypes.string.isRequired,
  format: PropTypes.string.isRequired
};

DateTime.defaultProps = {
  dateTime: undefined
};

function mapStateToProps(state) {
  return {
    locale: getLocale(state)
  };
}

export default connect(mapStateToProps)(DateTime);
