import React from "react";
import ReactDOM from "react-dom";
import dotenv from "dotenv";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";

// CSS
import "./css/index.css";
import "./css/fonts/font-awesome.min.css";
// Components
import App from "./components/App";

// Redux
import store from "./store/Store";

dotenv.config();

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
