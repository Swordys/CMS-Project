import {
  USER_LOGGEED_IN,
  USER_LOGGEED_OUT,
  USER_DATA_LOADED,
  USER_DATA_NULL,
  MESSAGE_SENT,
  MESSAGE_LOG_LOADED,
  MESSAGE_LOG_EMPTY,
  LOADING_STARTED,
  LOADING_STOPPED
} from ".././actions/ActionTypes";

export const userSignStatusReducer = (state = false, action) => {
  switch (action.type) {
    case USER_LOGGEED_IN:
      return true;
    case USER_LOGGEED_OUT:
      return false;
    default:
      return state;
  }
};

export const userDataReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DATA_LOADED:
      return action.userData;
    case USER_DATA_NULL:
      return state;
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

export const userMessagesReducer = (state = [], action) => {
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
