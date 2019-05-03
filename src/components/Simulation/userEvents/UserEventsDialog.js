import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userEventsDialogId } from "../../../styleConstants";
import MetroIcon from "../../MetroIcon";
import {
  addUserEvent,
  clearUserEvents,
  removeUserEvent,
  runScheduledUserEvents,
  stopScheduledUserEvents
} from "../../../reduxStore/userEvents/reducer";
import { userEventPropType } from "../../../customPropTypes";
import {
  selectSimulationNodes,
  selectUserEvents
} from "../../../reduxStore/selectors";
import { pointerCursorOnHoverStyle } from "../../../utils";
import { possibleActionsForStatus } from "../index";
import { fireUserEvents } from "./userEventsManager";

const possibleActions = [
  ...new Set(Object.values(possibleActionsForStatus).flat())
];

class UserEventsDialog extends Component {
  constructor(props) {
    super(props);
    const { nids } = props;

    this.state = {
      selectedTime: undefined,
      selectedNid: nids[0],
      selectedAction: possibleActions[0]
    };

    this.runUserEvents = this.runUserEvents.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.addUserEvent = this.addUserEvent.bind(this);
    this.onTimeInputChange = this.onTimeInputChange.bind(this);
    this.onNodeNidSelectChange = this.onNodeNidSelectChange.bind(this);
    this.onActionSelectChange = this.onActionSelectChange.bind(this);
  }

  runUserEvents() {
    const { dispatch, events } = this.props;
    dispatch(runScheduledUserEvents());
    fireUserEvents(events, () => {
      dispatch(clearUserEvents());
      dispatch(stopScheduledUserEvents());
    });
  }

  onClickDelete(eventId) {
    const { dispatch } = this.props;
    dispatch(removeUserEvent(eventId));
  }

  onTimeInputChange({ target: { value: selectedTime } }) {
    this.setState({ selectedTime });
  }

  onNodeNidSelectChange({ target: { value: selectedNid } }) {
    this.setState({ selectedNid });
  }

  onActionSelectChange({ target: { value: selectedAction } }) {
    this.setState({ selectedAction });
  }

  addUserEvent() {
    const { nids, dispatch } = this.props;
    const {
      selectedAction: action,
      selectedNid: stateSelectedNid,
      selectedTime
    } = this.state;
    const node = stateSelectedNid || nids[0];
    if (!isNaN(selectedTime)) {
      dispatch(addUserEvent({ time: Number(selectedTime), action, node }));
    }
  }

  render() {
    const { events, nids } = this.props;
    const { selectedAction, selectedNid, selectedTime } = this.state;
    return (
      <div className="dialog" data-role="dialog" id={userEventsDialogId}>
        <div className="dialog-title">Schedule events</div>
        <div className="dialog-content">
          <table className={"table striped row-border"}>
            <thead>
              <tr>
                <th width="30%">Time (ms)</th>
                <th width="35%">Node</th>
                <th width="30%">Action</th>
                <th width="5%" />
              </tr>
            </thead>
            <tbody>
              {events.map(({ time, node, action, eventId }) => (
                <tr key={eventId}>
                  <td>{time}</td>
                  <td>{node}</td>
                  <td>{action}</td>
                  <td>
                    <MetroIcon
                      icon={"bin"}
                      colour={"darkRed"}
                      style={pointerCursorOnHoverStyle}
                      onClick={() => this.onClickDelete(eventId)}
                    />
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                  <input
                    type="number"
                    value={selectedTime}
                    onChange={this.onTimeInputChange}
                  />
                </td>
                <td>
                  <select
                    value={selectedNid}
                    onChange={this.onNodeNidSelectChange}
                  >
                    {nids.map(nid => (
                      <option value={nid} key={nid}>
                        {nid}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={selectedAction}
                    onChange={this.onActionSelectChange}
                  >
                    {possibleActions.map(action => (
                      <option value={action} key={action}>
                        {action}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <MetroIcon
                    icon={"add"}
                    colour={"green"}
                    style={pointerCursorOnHoverStyle}
                    onClick={this.addUserEvent}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="dialog-actions">
          <button
            className="button success js-dialog-close"
            onClick={this.runUserEvents}
          >
            Run <MetroIcon icon={"play"} />
          </button>
          <button className="button js-dialog-close">Cancel</button>
        </div>
      </div>
    );
  }
}

UserEventsDialog.propTypes = {
  dispatch: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(userEventPropType).isRequired,
  nids: PropTypes.arrayOf(PropTypes.string).isRequired
};

function mapStateToProps(state) {
  return {
    events: selectUserEvents(state).events,
    nids: selectSimulationNodes(state).map(({ nid }) => nid)
  };
}

export default connect(mapStateToProps)(UserEventsDialog);
