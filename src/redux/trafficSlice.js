import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    cols: [],
};

export const trafficSlice = createSlice({
    name: "traffic",
    initialState,
    reducers: {
        updateData: (state, x) => {
            state.data = x.payload[0];
            state.cols = x.payload[1];
        },
    },
});

export const { updateData } = trafficSlice.actions;

export default trafficSlice.reducer;
