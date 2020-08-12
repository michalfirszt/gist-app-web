import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./views/home/Home";
import Gist from "./views/gist/Gist";

function Routes() {
    return (
        <Switch>
            <Route path="/gist/:id">
                <Gist />
            </Route>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
    )
}

export default Routes;
