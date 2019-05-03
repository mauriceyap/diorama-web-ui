import { createAction, handleActions } from "redux-actions";
import { getRandomString } from "../../utils";

const initialState = {
  isRunning: false,
  events: []
};

function RUN_SCHEDULED_USER_EVENTS(state) {
  return { ...state, isRunning: true };
}

function STOP_SCHEDULED_USER_EVENTS(state) {
  return { ...state, isRunning: false };
}

function ADD_USER_EVENT(state, { payload }) {
  const { events: prevEvents } = state;
  return {
    ...state,
    events: [...prevEvents, { ...payload, eventId: getRandomString() }].sort(
      ({ time: timeA }, { time: timeB }) => timeA - timeB
    )
  };
}

function REMOVE_USER_EVENT(state, { payload }) {
  const { events: prevEvents } = state;
  return {
    ...state,
    events: prevEvents.filter(({ eventId }) => eventId !== payload)
  };
}

function CLEAR_USER_EVENTS(state) {
  return { ...state, events: [] };
}

export const runScheduledUserEvents = createAction("RUN_SCHEDULED_USER_EVENTS");
export const stopScheduledUserEvents = createAction(
  "STOP_SCHEDULED_USER_EVENTS"
);
export const addUserEvent = createAction("ADD_USER_EVENT");
// Usage: removeUserEvent(eventId)
export const removeUserEvent = createAction("REMOVE_USER_EVENT");
export const clearUserEvents = createAction("CLEAR_USER_EVENTS");

export default handleActions(
  {
    RUN_SCHEDULED_USER_EVENTS,
    STOP_SCHEDULED_USER_EVENTS,
    ADD_USER_EVENT,
    REMOVE_USER_EVENT,
    CLEAR_USER_EVENTS
  },
  initialState
);
