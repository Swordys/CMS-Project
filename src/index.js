// Modules
import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

// Style
import "./css/index.css";

// Components
import App from "./components/App.jsx";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
