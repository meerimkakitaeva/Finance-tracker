import {ICategory, ICategoryMutation} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {createCategory, deleteCategory, editCategory, fetchCategories, fetchOneCategory} from "./trackerThunk";
import {RootState} from "../app/store";

interface TrackerState {
    categories: ICategory[];
    category: ICategoryMutation | null;
    createCategoryLoading: boolean;
    editCategoryLoading: boolean;
    fetchCategories: boolean;
    fetchOneCategory: boolean;
    deleteCategoryLoading: boolean | string;
}

const initialState: TrackerState = {
    categories: [],
    category: null,
    createCategoryLoading: false,
    editCategoryLoading: false,
    fetchCategories: false,
    fetchOneCategory: false,
    deleteCategoryLoading: false,
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


