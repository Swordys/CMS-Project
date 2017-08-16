export const getMessageLogReducer = (state = [], action) => {
  switch (action.type) {
    case "SEND_MESSAGE":
      return [...state, action.msg];
    default:
      return state;
  }
};
