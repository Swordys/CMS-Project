import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";

import "./css/index.css";
import App from "./components/App";
import store from "./store/Store";

import "./firebase/firestoreAuth";

ReactDOM.render(
  <Provider store={store()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

// {
//   "rules": {
//     ".read": "auth != null",
//     ".write":"auth != null"
//   }
// }
