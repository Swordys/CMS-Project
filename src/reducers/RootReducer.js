import { combineReducers } from "redux";

// reducers
import {
  getMessageLogReducer,
  toggleEmojiReducer,
  sendEmojiReducer
} from "./Reducers";

const rootReducer = combineReducers({
  getMessages: getMessageLogReducer,
  getEmojiState: toggleEmojiReducer,
  getSentEmoji: sendEmojiReducer
});

export default rootReducer;