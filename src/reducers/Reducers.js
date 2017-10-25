import {
  MESSAGE_SENT,
  EMOJI_TOGGLED,
  EMOJI_CLOSED,
  EMOJI_SENT
} from ".././actions/ActionTypes";

import {updateMessage} from '../helpers/messageHelper';

export const messageLogReducer = (state = [], action) => {
  switch (action.type) {
    case "MESSAGELOG_LOADED":
      return action.msgArr;
    case "MESSAGELOG_EMPTY":
      return state;
    case "MESSAGE_URL_LOADED":
      return [...updateMessage(state, action.urlObj)]
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
