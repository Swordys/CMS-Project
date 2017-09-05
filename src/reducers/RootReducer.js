import { combineReducers } from "redux";

// reducers
import { getMessageLogReducer, toggleEmojiReducer } from "./Reducers";

const rootReducer = combineReducers({
  getMessages: getMessageLogReducer,
  getEmojiState: toggleEmojiReducer
});

export default rootReducer;
