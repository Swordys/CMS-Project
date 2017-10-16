import {
  SEND_MESSAGE,
  TOGGLE_EMOJI,
  CLOSE_EMOJI,
  SEND_EMOJI
} from ".././actions/ActionTypes";

export const getMessageLogReducer = (state = [], action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return [...state, action.msg];
    default:
      return state;
  }
};

export const toggleEmojiReducer = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_EMOJI:
      return !state;
    case CLOSE_EMOJI:
      return false;
    default:
      return state;
  }
};

export const sendEmojiReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_EMOJI:
      return action.emoji;
    default:
      return state;
  }
};
