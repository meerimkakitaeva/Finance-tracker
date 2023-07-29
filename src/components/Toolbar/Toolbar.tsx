import React from 'react';
import {NavLink} from "react-router-dom";

const Toolbar: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
            <div className="container-fluid d-flex justify-content-between">
                <span className="navbar-brand">Finance Tracker</span>
               <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/categories">Categories</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/add-transaction">Add</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Toolbar;