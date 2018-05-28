import { combineReducers } from "redux";

// reducers
import {
  userSignStatusReducer,
  userDataReducer,
  loadIconReducer,
  userMessagesReducer
} from "./Reducers";

const rootReducer = combineReducers({
  userSignediIn: userSignStatusReducer,
  userData: userDataReducer,
  loadingState: loadIconReducer,
  userMessages: userMessagesReducer
});

export default rootReducer;
