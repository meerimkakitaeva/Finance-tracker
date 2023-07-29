import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hook";
import {
    selectEditTransactionLoading,
    selectOneTransaction,
    selectOneTransactionLoading
} from "../../../store/trackerSlice";
import {editTransaction, fetchOneTransaction} from "../../../store/trackerThunk";
import {ITransactionItem} from "../../../types";
import Toolbar from "../../../components/Toolbar/Toolbar";
import TransactionForm from "../../../components/TransactionForm/TransactionForm";
import Spinner from "../../../components/Spinner/Spinner";

const EditTransaction = () => {
    const {id} = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const editLoading = useAppSelector(selectEditTransactionLoading);
    const transaction = useAppSelector(selectOneTransaction);
    const oneLoading = useAppSelector(selectOneTransactionLoading);

    useEffect(() => {
        dispatch(fetchOneTransaction(id));
    }, [dispatch]);

    const onSubmit = async (transaction: ITransactionItem) => {
        await dispatch(editTransaction({id, transaction}));
    };

    return (
        <div>
            <Toolbar />
            {oneLoading ? (
                <Spinner />
            ) : (
                transaction && (
                    <TransactionForm
                        onSubmit={onSubmit}
                        existingTransaction={transaction}
                        isLoading={editLoading}
                    />
                )
            )}
        </div>
    );
};

export default EditTransaction;