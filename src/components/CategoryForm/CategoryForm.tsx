import React, {useState} from 'react';
import {ICategoryMutation, TApiCategory} from "../../types";
import ButtonSpinner from "../Spinner/ButtonSpinner";
import {TYPES} from "../../constants";
import Modal from "../Modal/Modal";
import {useNavigate} from "react-router-dom";

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
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

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

    const onCancel = async () => {
        await setShow(false);
        await navigate('/');
    }

    return (
        <>
            <Modal show={true} title={isEdit ? 'Edit category' : 'Add new category'} onClose={() => setShow(false)}>
                <div className="modal-body">
                    <form onSubmit={onFormSubmit} className="posts-container">
                        <div className="form-group">
                            <label htmlFor="type">Type:</label>
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

                        <button type="submit" className="btn btn-primary mt-3" disabled={isLoading} >
                            {isLoading && <ButtonSpinner />}
                            {isEdit ? 'Save' : 'Create'}
                        </button>
                        <button type="submit" className="btn btn-danger mt-3 ms-2" onClick={onCancel}>
                            Cancel
                        </button>
                    </form>
                </div>
            </Modal>
        </>

    );
};

export default CategoryForm;