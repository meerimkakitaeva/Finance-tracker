import React from 'react';
import "./App.css";
import Home from "./containers/Home/Home";
import {Route, Routes} from "react-router-dom";
import AddCategory from "./containers/categories/AddCategory/AddCategory";
import Categories from "./containers/categories/Categories/Categories";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={(<Home />)} />
                <Route path="/categories" element={(<Categories />)} />
                <Route path="/add-category" element={(<AddCategory />)} />
                <Route path="*" element={(
                    <h1>Not Found!</h1>
                )}/>
            </Routes>
        </div>
    );
};

export default App;