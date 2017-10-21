import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";

// CSS
import "./css/index.css";
import "./css/fonts/font-awesome.min.css";
// Components
import App from "./components/App";

// Redux
import store from "./store/Store";

// require("dotenv").config({ path: __dirname + "/../.env" });

console.log(process.env);

ReactDOM.render(
  <Provider store={store()}>
    <App />
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
