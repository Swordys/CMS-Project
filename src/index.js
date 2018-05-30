import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";

import "./css/index.css";
import App from "./components/App";
import { UserProvider } from "./context/userContext";
import { ConversationProvider } from "./context/conversationContext";

ReactDOM.render(
  <UserProvider>
    <ConversationProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConversationProvider>
  </UserProvider>,
  document.getElementById("root")
);
registerServiceWorker();
