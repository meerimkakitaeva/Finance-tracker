import {ICategory, ICategoryMutation} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {createCategory} from "./trackerThunk";
import {RootState} from "../app/store";

interface TrackerState {
    categories: ICategory[];
    category: ICategoryMutation | null;
    createCategoryLoading: boolean;
    editCategoryLoading: boolean;
}

const initialState: TrackerState = {
    categories: [],
    category: null,
    createCategoryLoading: false,
    editCategoryLoading: false,
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
    }
});


export const trackerReducer = trackerSlice.reducer;
export const selectCreateCategoryLoading = (state: RootState) => state.tracker.createCategoryLoading;

