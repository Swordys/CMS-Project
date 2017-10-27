import { combineReducers } from "redux";

// reducers
import {
  messageLogReducer,
  toggleEmojiReducer,
  sendEmojiReducer,
  loadIconReducer,
  loadedMessageHeightReducer,
  loadedMetaUrlHeight,
} from "./Reducers";

const rootReducer = combineReducers({
  getMessages: messageLogReducer,
  getEmojiState: toggleEmojiReducer,
  getSentEmoji: sendEmojiReducer,
  loadingState: loadIconReducer,
  nextHeight: loadedMessageHeightReducer,
  metaHeight: loadedMetaUrlHeight,
});

export default rootReducer;
