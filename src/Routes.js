import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./views/home/Home";
import Gist from "./views/gist/Gist";
import CreateGist from "./views/create-gist/CreateGist";

function Routes() {
    return (
        <Switch>
            <Route path="/gist/create">
                <CreateGist />
            </Route>
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
