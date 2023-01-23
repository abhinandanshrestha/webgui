import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    normal: [],
    attack: [],
    attackTypes: [],
};

export const scatterSlice = createSlice({
    name: "scatter",
    initialState,
    reducers: {
        updateScatter: (state, data) => {
            state.data = data.payload;
            state.normal = data.payload.shift();
            state.attack = data.payload.shift();
            state.attackTypes = data.payload;
        },
    },
});

export const { updateScatter } = scatterSlice.actions;

export default scatterSlice.reducer;
