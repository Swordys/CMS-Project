import { combineReducers } from "redux";

// reducers
import {
  messageLogReducer,
  toggleEmojiReducer,
  sendEmojiReducer,
  loadIconReducer,
  loadedMessageHeightReducer
} from "./Reducers";

const rootReducer = combineReducers({
  getMessages: messageLogReducer,
  getEmojiState: toggleEmojiReducer,
  getSentEmoji: sendEmojiReducer,
  loadingState: loadIconReducer,
  nextHeight: loadedMessageHeightReducer
});

export default rootReducer;
