import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";

import "./css/index.css";
import App from "./components/App";
import store from "./store/Store";
import { UserProvider } from "./context/userContext";

ReactDOM.render(
  <UserProvider>
    <Provider store={store()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </UserProvider>,
  document.getElementById("root")
);
registerServiceWorker();
