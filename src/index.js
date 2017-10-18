// Modules
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";

// CSS
import "./css/index.css";
import './css/fonts/font-awesome.min.css'
// Components
import App from "./components/App";

// Redux
import store from "./store/Store";

ReactDOM.render(
  <Provider store={store()}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
