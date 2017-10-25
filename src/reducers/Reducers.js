import {
  MESSAGE_SENT,
  MESSAGE_LOG_LOADED,
  MESSAGE_LOG_EMPTY,
  MESSAGE_URL_LOADED,
  EMOJI_TOGGLED,
  EMOJI_CLOSED,
  EMOJI_SENT
} from ".././actions/ActionTypes";

import { updateMessage } from "../helpers/messageHelper";

export const messageLogReducer = (state = [], action) => {
  switch (action.type) {
    case MESSAGE_LOG_LOADED:
      return action.msgArr;
    case MESSAGE_LOG_EMPTY:
      return state;
    case MESSAGE_URL_LOADED:
      return [...updateMessage(state, action.urlObj)];
    case MESSAGE_SENT:
      return [...state, action.msg];
    default:
      return state;
  }
};

export const toggleEmojiReducer = (state = false, action) => {
  switch (action.type) {
    case EMOJI_TOGGLED:
      return !state;
    case EMOJI_CLOSED:
      return false;
    default:
      return state;
  }
};

export const sendEmojiReducer = (state = {}, action) => {
  switch (action.type) {
    case EMOJI_SENT:
      return action.emoji;
    default:
      return state;
  }
};
