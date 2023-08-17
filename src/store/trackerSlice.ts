import {ICategory, ICategoryMutation, ITransaction, ITransactionApi} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {
    createCategory, createTransaction,
    deleteCategory, deleteTransaction,
    editCategory, editTransaction,
    fetchCategories,
    fetchOneCategory, fetchOneTransaction,
    fetchTransactions
} from "./trackerThunk";
import {RootState} from "../app/store";

interface TrackerState {
    total: number;
    categories: ICategory[];
    category: ICategoryMutation | null;
    createCategoryLoading: boolean;
    editCategoryLoading: boolean;
    fetchCategories: boolean;
    fetchOneCategory: boolean;
    deleteCategoryLoading: boolean | string;
    transactions : ITransactionApi[];
    transaction: ITransaction | null;
    createTransactionLoading: boolean;
    fetchTransactionsLoading: boolean;
    fetchOneTransactionsLoading: boolean;
    editTransactionLoading: boolean;
    deleteTransactionLoading: boolean | string ;
}

const initialState: TrackerState = {
    total: 0,
    categories: [],
    category: null,
    createCategoryLoading: false,
    editCategoryLoading: false,
    fetchCategories: false,
    fetchOneCategory: false,
    deleteCategoryLoading: false,
    transactions: [],
    transaction: null,
    createTransactionLoading: false,
    fetchTransactionsLoading: false,
    fetchOneTransactionsLoading: false,
    editTransactionLoading: false,
    deleteTransactionLoading: false,
}

export const trackerSlice = createSlice({
    name: 'tracker',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createCategory.pending, (state) => {
           state.createCategoryLoading = true;
        });
        builder.addCase(createCategory.fulfilled, (state) => {
            state.createCategoryLoading = false;
        });
        builder.addCase(createCategory.rejected, (state) => {
            state.createCategoryLoading = true;
        });



        builder.addCase(fetchCategories.pending, (state) => {
            state.fetchCategories = true;
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.fetchCategories = false;
        });
        builder.addCase(fetchCategories.rejected, (state) => {
            state.fetchCategories = true;
        });


        builder.addCase(fetchOneCategory.pending, (state) => {
            state.fetchOneCategory = true;
        });
        builder.addCase(fetchOneCategory.fulfilled, (state, action) => {
            state.category = action.payload;
            state.fetchOneCategory = false;
        });
        builder.addCase(fetchOneCategory.rejected, (state) => {
            state.fetchOneCategory = true;
        });


        builder.addCase(editCategory.pending, (state) => {
           state.editCategoryLoading = true;
        });
        builder.addCase(editCategory.fulfilled, (state) => {
            state.editCategoryLoading = false;
        });
        builder.addCase(editCategory.rejected, (state) => {
            state.editCategoryLoading = true;
        });


        builder.addCase(deleteCategory.pending, (state, action) => {
            state.deleteCategoryLoading = action.meta.arg;
        });
        builder.addCase(deleteCategory.fulfilled, (state) => {
           state.deleteCategoryLoading = false;
        });
        builder.addCase(deleteCategory.rejected, (state) => {
           state.deleteCategoryLoading = true;
        });


        builder.addCase(createTransaction.pending, (state) => {
           state.createTransactionLoading = true;
        });
        builder.addCase(createTransaction.fulfilled, (state) => {
            state.createTransactionLoading = false;
        });
        builder.addCase(createTransaction.rejected, (state) => {
            state.createTransactionLoading = true;
        });


        builder.addCase(fetchTransactions.pending, (state) => {
            state.fetchTransactionsLoading = true;
        });
        builder.addCase(fetchTransactions.fulfilled, (state, action) => {
            state.transactions = action.payload;
            state.fetchTransactionsLoading = false;
            state.total = state.transactions.reduce((acc, transaction) => {
                const transactionAmount = Number(transaction.amount);

                if (transaction.type === 'income') {
                    return acc + transactionAmount;
                } else {
                    return acc - transactionAmount;
                }
            }, 0);
        });
        builder.addCase(fetchTransactions.rejected, (state) => {
            state.fetchTransactionsLoading = true;
        });



        builder.addCase(fetchOneTransaction.pending, (state) => {
           state.fetchOneTransactionsLoading = true;
        });
        builder.addCase(fetchOneTransaction.fulfilled, (state, action) => {
            state.fetchOneTransactionsLoading = false;
            state.transaction = action.payload;
        });
        builder.addCase(fetchOneTransaction.rejected, (state) => {
            state.fetchOneTransactionsLoading = true;
        });


        builder.addCase(editTransaction.pending, (state) => {
           state.editTransactionLoading = true;
        });
        builder.addCase(editTransaction.fulfilled, (state) => {
            state.editTransactionLoading = true;
        });
        builder.addCase(editTransaction.rejected, (state) => {
            state.editTransactionLoading = true;
        });


        builder.addCase(deleteTransaction.pending, (state, action) => {
           state.deleteTransactionLoading = action.meta.arg;
        });
        builder.addCase(deleteTransaction.fulfilled, (state) => {
            state.deleteTransactionLoading = false;
        });
        builder.addCase(deleteTransaction.rejected, (state) => {
            state.deleteTransactionLoading = true;
        });
    }
});


export const trackerReducer = trackerSlice.reducer;
export const selectCreateCategoryLoading = (state: RootState) => state.tracker.createCategoryLoading;
export const selectFetchCategories = (state: RootState) => state.tracker.fetchCategories;
export const selectCategories = (state: RootState) => state.tracker.categories;
export const selectOneCategory = (state: RootState) => state.tracker.category;
export const selectOneCategoryLoading = (state: RootState) => state.tracker.fetchOneCategory;
export const selectEditLoading = (state: RootState) => state.tracker.editCategoryLoading;
export const selectDeleteLoading = (state: RootState) => state.tracker.deleteCategoryLoading;
export const selectCreateTransactionLoading = (state: RootState) => state.tracker.createTransactionLoading;
export const selectTransactions = (state: RootState) => state.tracker.transactions;
export const selectTransactionsLoading = (state: RootState) => state.tracker.fetchTransactionsLoading;
export const selectTotal = (state: RootState) => state.tracker.total;
export const selectOneTransaction = (state: RootState) => state.tracker.transaction;
export const selectOneTransactionLoading = (state: RootState) => state.tracker.fetchOneTransactionsLoading;
export const selectEditTransactionLoading = (state: RootState) => state.tracker.editTransactionLoading;
export const selectDeleteTransactionLoading = (state: RootState) => state.tracker.deleteTransactionLoading;



