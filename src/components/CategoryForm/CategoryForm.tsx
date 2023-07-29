import React, {useEffect, useState} from 'react';
import {ICategoryMutation, TApiCategory} from "../../types";
import ButtonSpinner from "../Spinner/ButtonSpinner";
import {TYPES} from "../../constants";

interface Props {
    onSubmit: (newCategory: TApiCategory) => void;
    existingCategory?: ICategoryMutation;
    isEdit?: boolean;
    isLoading?: boolean;
}

const initialState = {
    type: '',
    name: '',
}


const CategoryForm: React.FC<Props> = ({onSubmit, existingCategory = initialState, isEdit, isLoading}) => {
    const [newCategory, setCategory] = useState<ICategoryMutation>(existingCategory);

    const categoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;

        setCategory(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmit({
           ...newCategory,
        });
    };

    return (
        <form onSubmit={onFormSubmit} className="posts-container">
            <h4>{isEdit ? 'Edit category' : 'Add new category'}</h4>
            <div className="form-group">
                <label htmlFor="type">Name:</label>
                <select
                    name="type"
                    id="type"
                    className="form-control"
                    value={newCategory.type}
                    onChange={categoryChange}
                    required
                >
                    <option value="">Select type of category</option>
                    {TYPES.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.type}
                        </option>
                    ))}
                </select>
            </div>


            <div className="form-group mb-3">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    value={newCategory.name}
                    onChange={categoryChange}
                    required
                />
            </div>

            <button type="submit" className="btn btn-primary mt-3" disabled={isLoading}>
                {isLoading && <ButtonSpinner />}
                {isEdit ? 'Save' : 'Create'}
            </button>
        </form>
    );
};

export default CategoryForm;