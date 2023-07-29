import {createAsyncThunk} from "@reduxjs/toolkit";
import {ICategoriesList, ICategory, TApiCategory} from "../types";
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