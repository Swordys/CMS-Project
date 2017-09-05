export const getMessageLogReducer = (state = [], action) => {
  switch (action.type) {
    case "SEND_MESSAGE":
      return [...state, action.msg];
    default:
      return state;
  }
};

export const toggleEmojiReducer = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_EMOJI":
      return !state;
    default:
      return state;
  }
};
