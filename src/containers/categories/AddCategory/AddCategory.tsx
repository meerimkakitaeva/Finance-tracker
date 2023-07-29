import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hook";
import {useNavigate} from "react-router-dom";
import {selectCreateCategoryLoading} from "../../../store/trackerSlice";
import {TApiCategory} from "../../../types";
import {createCategory} from "../../../store/trackerThunk";
import CategoryForm from "../../../components/CategoryForm/CategoryForm";

const AddCategory = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loading = useAppSelector(selectCreateCategoryLoading);


    const onSubmit = async (item: TApiCategory) => {
        await dispatch(createCategory(item));
        navigate('/categories');
    };

    return (
        <div>
            <CategoryForm
                onSubmit={onSubmit}
                isLoading={loading}
            />
        </div>
    );
};

export default AddCategory;