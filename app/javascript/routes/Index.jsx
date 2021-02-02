import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import GitGraph from "../components/GitGraph"
import GitFlow from "../components/GitFlow"

export default (
    <Router>
        <Switch>
            <Route path="/" exact component={GitFlow} />
        </Switch>
    </Router>
);