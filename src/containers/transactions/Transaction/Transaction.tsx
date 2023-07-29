import React, {useEffect} from 'react';
import Toolbar from "../../../components/Toolbar/Toolbar";
import {useAppDispatch, useAppSelector} from "../../../app/hook";
import {selectTotal, selectTransactions, selectTransactionsLoading} from "../../../store/trackerSlice";
import {fetchTransactions} from "../../../store/trackerThunk";
import Spinner from "../../../components/Spinner/Spinner";
import TransactionItem from "../../../components/TransactionItem/TransactionItem";

const Transaction = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectTransactions);
    const loading = useAppSelector(selectTransactionsLoading);
    const total = useAppSelector(selectTotal);


    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);


    let transactions: React.ReactNode = <Spinner />;

    if (!loading) {
        transactions = items.map((item) => (
            <TransactionItem key={item.id} transaction={item} />
        ))
    }

    return (
        <div>
            <Toolbar />
            <div className="posts-container mt-3">
                <div className="card p-2" style={{width: 200}}>Total: {total}</div>
                {transactions}
            </div>
        </div>
    );
};

export default Transaction;