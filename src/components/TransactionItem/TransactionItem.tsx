import React from 'react';
import {ITransactionApi} from "../../types";
import dayjs from "dayjs";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectDeleteTransactionLoading} from "../../store/trackerSlice";
import {deleteTransaction, fetchTransactions} from "../../store/trackerThunk";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props {
    transaction: ITransactionApi;
}

const TransactionItem:React.FC<Props> = ({transaction}) => {
    const textColor = transaction.type === 'income' ? 'green' : 'red';

    const dispatch = useAppDispatch();
    const deleteLoading = useAppSelector(selectDeleteTransactionLoading);

    const onDelete = async () => {
        if (window.confirm('Delete this transaction ?')) {
            await dispatch(deleteTransaction(transaction.id));
            await dispatch(fetchTransactions());
        }
    };

    return (
        <div>
            <div className="card card-show  mt-3" style={{ width: 600 }}>
                <div className="card-body text-center d-flex flex-row justify-content-between">
                    <p>{dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm:ss')}</p>
                    <h6 className="card-text">{transaction.name}</h6>
                    <div className="d-flex">
                        <p className="card-text" style={{ color: textColor }}>
                            {transaction.type === 'expense' ? '-' : '+'}{transaction.amount}
                        </p>
                        <div className="links ms-3">
                            <Link
                                className="btn btn-outline-success"
                                to={"/edit-transaction/" + transaction.id}
                            >
                                edit
                            </Link>
                            <button
                                className="btn btn-outline-danger ms-2"
                                onClick={onDelete}
                                disabled={deleteLoading ? deleteLoading === transaction.id : false}
                            >
                                {deleteLoading && deleteLoading === transaction.id && <ButtonSpinner/>}
                                delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionItem;