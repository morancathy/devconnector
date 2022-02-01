import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//anytime want to interact component with redux, (calling action or getting the state) need to use connect

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});
//we want to fetch the alert state (that we saw in redux tool)
export default connect(mapStateToProps)(Alert);
