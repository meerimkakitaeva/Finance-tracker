import React, {useEffect} from 'react';
import {Link, NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hook";
import {selectCategories, selectFetchCategories} from "../../../store/trackerSlice";
import {fetchCategories} from "../../../store/trackerThunk";
import CategoryItem from "../../../components/CategoryItem/CategoryItem";
import Spinner from "../../../components/Spinner/Spinner";
import Toolbar from "../../../components/Toolbar/Toolbar";

const Categories = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectCategories);
    const fetchLoading = useAppSelector(selectFetchCategories);

    let categories: React.ReactNode = <Spinner />;

    if (!fetchLoading) {
        categories = items.map((item) => (
            <CategoryItem key={item.id} category={item} />
        ))
    }

    useEffect(() => {
       dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div>
            <Toolbar />
            <div className="posts-container mt-3">
                <Link className="btn btn-outline-success" to="/categories/add-category">Add</Link>
                {categories}
            </div>
        </div>
    );
};

export default Categories;