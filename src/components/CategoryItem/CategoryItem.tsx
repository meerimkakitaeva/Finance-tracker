import React from 'react';
import {ICategory} from "../../types";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectDeleteLoading} from "../../store/trackerSlice";
import {deleteCategory, fetchCategories} from "../../store/trackerThunk";
import ButtonSpinner from "../Spinner/ButtonSpinner";


interface Props {
    category: ICategory;
}
const CategoryItem: React.FC<Props> = ({category}) => {
    const dispatch = useAppDispatch();
    const deleteLoading = useAppSelector(selectDeleteLoading);
    const textColor = category.type === 'income' ? 'green' : 'red';

    const onDelete = async () => {
      if (window.confirm('Delete this category ?')) {
          await dispatch(deleteCategory(category.id));
          await dispatch(fetchCategories());
      }
    };

    return (
        <div>
            <div className="card card-show  mt-5" style={{ width: 600 }}>
                <div className="card-body text-center d-flex flex-row justify-content-between">
                    <h6 className="card-text">{category.name}</h6>
                    <div className="d-flex">
                        <p className="card-text" style={{ color: textColor }}>
                            {category.type}
                        </p>
                        <div className="links ms-3">
                            <Link
                                className="btn btn-outline-success"
                                to={'/categories/edit-category/' + category.id}
                            >
                                edit
                            </Link>
                            <button
                                className="btn btn-outline-danger ms-2"
                                onClick={onDelete}
                                disabled={deleteLoading ? deleteLoading === category.id : false}
                            >
                                {deleteLoading && deleteLoading === category.id && <ButtonSpinner/>}
                                delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryItem;