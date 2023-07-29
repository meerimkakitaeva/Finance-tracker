import React from 'react';
import {Link, NavLink} from "react-router-dom";

const Toolbar: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container-fluid d-flex justify-content-between">
                <Link to={'/'} className="navbar-brand">Finance Tracker</Link>
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