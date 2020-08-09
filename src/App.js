import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { Home } from "./views/home/Home";
import { Gist } from "./views/gist/Gist";

function App() {
    return (
        <Router>
            <Navbar />

            <div className="container mt-5 pt-5">
                <Switch>
                    <Route path="/gist/:id">
                        <Gist />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
