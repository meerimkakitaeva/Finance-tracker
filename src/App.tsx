import React from 'react';
import {Route, Routes} from "react-router-dom";
import AddCategory from "./containers/categories/AddCategory/AddCategory";
import Categories from "./containers/categories/Categories/Categories";
import EditCategory from "./containers/categories/EditCategory/EditCategory";
import Transaction from "./containers/transactions/Transaction/Transaction";
import AddTransaction from "./containers/transactions/AddTransaction/AddTransaction";
import "./App.css";
import EditTransaction from "./containers/transactions/EditTransaction/EditTransaction";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={(<Transaction />)} />
                <Route path="/add-transaction" element={(<AddTransaction />)} />
                <Route path="/edit-transaction/:id" element={(<EditTransaction />)} />
                <Route path="/categories" element={(<Categories />)} />
                <Route path="/categories/add-category" element={(<AddCategory />)} />
                <Route path="/categories/edit-category/:id" element={(<EditCategory />)} />
                <Route path="*" element={(
                    <h1>Not Found!</h1>
                )}/>
            </Routes>
        </div>
    );
};

export default App;