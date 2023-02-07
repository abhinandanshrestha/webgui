import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    categoryCount: undefined,
    attackCategories: [],
};

export const scatterSlice = createSlice({
    name: "scatter",
    initialState,
    reducers: {
        updateScatter: (state, data) => {
            state.data = data.payload[0];
            state.categoryCount = data.payload[1];
            let categories = Object.keys(data.payload[1]);
            let attackCategories = [];
            categories.forEach((category) => {
                if (category !== "attack" && category !== "Type11") {
                    attackCategories.push(category);
                }
            });
            state.attackCategories = attackCategories;
        },
    },
});

export const { updateScatter } = scatterSlice.actions;

export default scatterSlice.reducer;
