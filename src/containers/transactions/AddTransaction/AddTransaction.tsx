import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hook";
import {useNavigate} from "react-router-dom";
import {selectCreateTransactionLoading} from "../../../store/trackerSlice";
import {ITransactionItem} from "../../../types";
import {createTransaction, fetchCategories} from "../../../store/trackerThunk";
import Toolbar from "../../../components/Toolbar/Toolbar";
import TransactionForm from "../../../components/TransactionForm/TransactionForm";

const AddTransaction = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const loading = useAppSelector(selectCreateTransactionLoading);

    const onsubmit = async (transaction: ITransactionItem) => {
        await dispatch(createTransaction(transaction));
        navigate('/');
    };

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);


    return (
        <div>
            <Toolbar />
            <TransactionForm
                onSubmit={onsubmit}
                isLoading={loading}
            />
        </div>
    );
};

export default AddTransaction;