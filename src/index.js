import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
// import axios from "axios";
// axios.defaults.baseURL = "https://burger-builder-2f6a1.firebaseio.com/";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
