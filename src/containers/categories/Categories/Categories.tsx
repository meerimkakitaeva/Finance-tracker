import React from 'react';
import {Link, NavLink} from "react-router-dom";

const Categories = () => {
    return (
        <div className="posts-container">
            <Link className="btn btn-outline-success" to="/add-category">Add</Link>
        </div>
    );
};

export default Categories;