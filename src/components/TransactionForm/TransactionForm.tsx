import React, { useState } from 'react';
import { ITransactionItem, ITransactionMutation } from '../../types';
import { useAppSelector } from '../../app/hook';
import { selectCategories } from '../../store/trackerSlice';
import { TYPES } from '../../constants';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import Modal from "../Modal/Modal";
import {useNavigate} from "react-router-dom";

interface Props {
    onSubmit: (transaction: ITransactionItem) => void;
    existingTransaction?: ITransactionMutation;
    isEdit?: boolean;
    isLoading?: boolean;
}

const initialState: ITransactionMutation = {
    type: '',
    name: '',
    amount: 0,
    createdAt: '',
};

const TransactionForm: React.FC<Props> = ({ onSubmit, existingTransaction = initialState, isLoading, isEdit }) => {
    const [newTransaction, setTransaction] = useState<ITransactionMutation>(existingTransaction);
    const allCategories = useAppSelector(selectCategories);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const categories = () => {
        return allCategories.filter(category => {
            return category.name;
        });
    };

    const newCategories = categories();

    const transactionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setTransaction((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let key: string = '';
        const id = newCategories.find((category) => {
            if (newTransaction.name === category.name) {
                key = category.id;
            }
            return key;
        });

        if (id) {
            onSubmit({
                amount: newTransaction.amount,
                category: key,
                createdAt: new Date().toISOString(),
            });
        }
    };

    const onCancel = async () => {
        await setShow(false);
        await navigate('/');
    }

    return (

    <>
        <Modal show={true} title={isEdit ? 'Edit Transaction': 'Add Transaction'} onClose={() => setShow(false)}>
            <div className="modal-body">
                <form onSubmit={onFormSubmit} className="posts-container mt-3">
                    <div className="form-group">
                        <label htmlFor="type">Type:</label>
                        <select
                            name="type"
                            id="type"
                            className="form-control"
                            value={newTransaction.type}
                            onChange={transactionChange}
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

                    <div className="form-group">
                        <label htmlFor="category">Category:</label>
                        <select
                            name="name" //
                            id="category"
                            className="form-control"
                            value={newTransaction.name}
                            onChange={transactionChange}
                        >
                            <option value="">Select category</option>
                            {newCategories.map((category) => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="number">Amount :</label>
                        <input
                            type="number"
                            name="amount"
                            id="number"
                            className="form-control"
                            value={newTransaction.amount}
                            onChange={transactionChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary mt-3" disabled={isLoading}>
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

export default TransactionForm;