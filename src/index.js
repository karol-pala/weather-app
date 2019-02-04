import React from "react";
import {BrowserRouter} from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./Components/App";
import "./stylesheet.css";

ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById("root"));