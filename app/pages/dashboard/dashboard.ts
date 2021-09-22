import React from "react";
import ReactDOM from "react-dom";

import "./dashboard.scss";
import DashboardRoot from "./DashboardRoot";

const root = document.createElement("div");

ReactDOM.render(React.createElement(DashboardRoot), root);

document.body.appendChild(root);
