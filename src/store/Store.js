import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducers/RootReducer";

const configStore = initalState => {
  return createStore(reducer, initalState, applyMiddleware(thunk));
};

export default configStore;
