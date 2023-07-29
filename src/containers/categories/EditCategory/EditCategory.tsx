import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hook";
import {useNavigate, useParams} from "react-router-dom";
import {selectEditLoading, selectOneCategory, selectOneCategoryLoading} from "../../../store/trackerSlice";
import {TApiCategory} from "../../../types";
import {editCategory, fetchOneCategory} from "../../../store/trackerThunk";
import Spinner from "../../../components/Spinner/Spinner";
import CategoryForm from "../../../components/CategoryForm/CategoryForm";

const EditCategory = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams() as {id: string};
    const navigate = useNavigate();
    const category = useAppSelector(selectOneCategory);
    const editLoading = useAppSelector(selectEditLoading);
    const oneLoading = useAppSelector(selectOneCategoryLoading);

    const onSubmit = async (category: TApiCategory) => {
        await dispatch(editCategory({id, category}));
        navigate('/categories');
    };

    useEffect(() => {
        dispatch(fetchOneCategory(id!));
    }, [dispatch]);

    return (
        <div>
            <div>
                {oneLoading ? (
                    <Spinner />
                ) : (
                    category && (
                        <CategoryForm
                            onSubmit={onSubmit}
                            existingCategory={category}
                            isLoading={editLoading}
                            isEdit
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default EditCategory;