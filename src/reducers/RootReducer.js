import { combineReducers } from "redux";

// reducers
import { messageLogReducer, loadIconReducer } from "./Reducers";

const rootReducer = combineReducers({
  getMessages: messageLogReducer,
  loadingState: loadIconReducer
});

export default rootReducer;
