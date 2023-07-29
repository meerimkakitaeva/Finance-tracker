import {createAsyncThunk} from "@reduxjs/toolkit";
import {TApiCategory} from "../types";
import axiosApi from "../axiosApi";

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
) ;