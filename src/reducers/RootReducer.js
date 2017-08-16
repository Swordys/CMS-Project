import { combineReducers } from "redux";

// reducers
import { getMessageLogReducer } from "./Reducers";

const rootReducer = combineReducers({
  getMessages: getMessageLogReducer
});

export default rootReducer;
