import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import GitGraph from "../components/GitGraph"
import GitGraph from "../components/GitGraph"

export default (
    <Router>
        <Switch>
            <Route path="/" exact component={GitGraph} />
        </Switch>
    </Router>
);