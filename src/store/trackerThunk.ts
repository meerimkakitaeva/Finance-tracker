import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    ICategoriesList,
    ICategory,
    ITransaction,
    ITransactionApi,
    ITransactionItem,
    ITransactionList,
    TApiCategory
} from "../types";
import axiosApi from "../axiosApi";


export const fetchCategories = createAsyncThunk<ICategory[]>(
    'tracker/fetchCategories',
    async () => {
        const categoriesResponse = await axiosApi.get<ICategoriesList | null>('/categories.json');
        const categoriesList = categoriesResponse.data;

        let newCategories: ICategory[] = [];
        if (categoriesList) {
            newCategories = Object.keys(categoriesList).map(id => {
                const category = categoriesList[id];
                return {
                    ...category,
                    id
                }
            });
        }
        return newCategories;
    }
);


export const fetchOneCategory = createAsyncThunk<ICategory, string>(
    'tracker/fetchOneCategory',
    async (id) => {
        const categoryResponse = await axiosApi.get<ICategory | null>('/categories/' + id + '.json');
        const category = categoryResponse.data;
        if (category === null) {
            throw new Error('Not found!');
        }
        return category;
    }
);

export const createCategory = createAsyncThunk<void, TApiCategory>(
    'tracker/create-category',
    async (category) => {
        await axiosApi.post('/categories.json', category);
    }
);

interface editCategoryParams {
    id: string,
    category: TApiCategory;
}

export const editCategory = createAsyncThunk<void , editCategoryParams>(
    'tracker/edit-category',
    async (params) => {
        await axiosApi.put(`/categories/${params.id}.json`, params.category);
    }
);


export const deleteCategory = createAsyncThunk<void, string>(
    'tracker/deleteCategory',
    async (categoryId) => {
        await axiosApi.delete(`/categories/${categoryId}.json`);
    }
);


export const createTransaction = createAsyncThunk<void, ITransactionItem>(
    'tracker/createTransaction',
    async (transaction) => {
        await axiosApi.post('/transactions.json', transaction);
    }
);


export const fetchTransactions = createAsyncThunk<ITransactionApi[]>(
    'tracker/fetchTransactions',
    async () => {
        const transactionsResponse = await axiosApi.get<ITransactionList>('/transactions.json');
        const categoriesResponse = await axiosApi.get<ICategoriesList>('/categories.json');

        const transactionsList = transactionsResponse.data || {};
        const categoriesList = categoriesResponse.data || {};

        const newTransactions = Object.entries(transactionsList).map(([id, transaction]) => {
            const category = categoriesList[transaction.category];
            if (!category) return null;

            return {
                type: category.type,
                name: category.name,
                amount: transaction.amount,
                createdAt: transaction.createdAt,
                id
            };
        }).filter(Boolean) as ITransactionApi[];

        return newTransactions;
    }
);


export const fetchOneTransaction = createAsyncThunk<ITransaction, string>(
    'tracker/fetchOne',
    async (id) => {
        const transactionResponse = await axiosApi.get<ITransactionItem | null>(`/transactions/${id}.json`);
        const transaction = transactionResponse.data;
        let newTransaction: ITransaction = {
            type: '',
            name: '',
            amount: 0,
            createdAt: '',
        }
        if (transaction === null) {
            throw new Error('Not found!');
        }
        const categoryResponse = await axiosApi.get<ICategory | null>(`/categories/${transaction.category}.json`);

        const category = categoryResponse.data;
        if (category) {
            newTransaction = {
                type: category.type,
                name: category.name,
                amount: transaction.amount,
                createdAt: transaction.createdAt,
            }
        }
        return newTransaction;
    }
);

interface editTransactionParams {
    id: string,
    transaction: ITransactionItem,
}

export const editTransaction = createAsyncThunk<void, editTransactionParams>(
    'tracker/edit-transaction',
    async (params) => {
        await axiosApi.put(`/transactions/${params.id}.json`, params.transaction);
    }
);

export const deleteTransaction = createAsyncThunk<void, string>(
    'tracker/deleteTransaction',
    async (id) => {
        await axiosApi.delete(`/transactions/${id}.json`);
    }
);
