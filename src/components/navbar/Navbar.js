import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appName: process.env.REACT_APP_NAME,
        };
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <Link className="navbar-brand" to="/">
                    { this.state.appName }
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/gist/create">
                                Create Gist
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;
