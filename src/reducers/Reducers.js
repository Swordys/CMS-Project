import {
  MESSAGE_SENT,
  MESSAGE_LOG_LOADED,
  MESSAGE_LOG_EMPTY,
  LOADING_STARTED,
  LOADING_STOPPED
} from ".././actions/ActionTypes";

export const messageLogReducer = (state = [], action) => {
  switch (action.type) {
    case MESSAGE_LOG_LOADED:
      return action.msgArr;
    case MESSAGE_LOG_EMPTY:
      return state;
    case MESSAGE_SENT:
      return [...state, action.msg];
    default:
      return state;
  }
};

export const loadIconReducer = (state = false, action) => {
  switch (action.type) {
    case LOADING_STARTED:
      return true;
    case LOADING_STOPPED:
      return false;
    default:
      return state;
  }
};
