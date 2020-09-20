import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./store/reducers";
// import axios from "axios";
// axios.defaults.baseURL = "https://burger-builder-2f6a1.firebaseio.com/";
const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById("root")
);
registerServiceWorker();
