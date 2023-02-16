import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    scrollPositions: {
        traffic: 0,
        form: 0,
        log: 0,
        scatter: 0,
        bar: 0,
        pie: 0,
    },
};

export const scrollSlice = createSlice({
    name: "scroll",
    initialState,
    reducers: {
        updateScrollPosition: (state, position) => {
            state.scrollPositions[position.payload[0]] = position.payload[1];
        },
    },
});

export const { updateScrollPosition } = scrollSlice.actions;

export default scrollSlice.reducer;
