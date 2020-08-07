import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appName: process.env.REACT_APP_NAME,
        };
    }

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark fixed-top">
                <Link className="navbar-brand" to="/">
                    { this.state.appName }
                </Link>
            </nav>
        )
    }
}

export default Navbar;
