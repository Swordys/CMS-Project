import { combineReducers } from "redux";

// reducers
import {
  messageLogReducer,
  toggleEmojiReducer,
  sendEmojiReducer,
  loadIconReducer
} from "./Reducers";

const rootReducer = combineReducers({
  getMessages: messageLogReducer,
  getEmojiState: toggleEmojiReducer,
  getSentEmoji: sendEmojiReducer,
  loadingState: loadIconReducer
});

export default rootReducer;
