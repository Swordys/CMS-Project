import { combineReducers } from "redux";

// reducers
import {
  messageLogReducer,
  toggleEmojiReducer,
  sendEmojiReducer,
} from "./Reducers";

const rootReducer = combineReducers({
  getMessages: messageLogReducer,
  getEmojiState: toggleEmojiReducer,
  getSentEmoji: sendEmojiReducer,
});

export default rootReducer;
