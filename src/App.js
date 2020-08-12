import React from 'react';
import './App.scss';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import Navbar from "./components/navbar/Navbar";

function App() {
    return (
        <Router>
            <Navbar />

            <div className="container mt-5 pt-5">
                <Routes />
            </div>
        </Router>
    );
}

export default App;
