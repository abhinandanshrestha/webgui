import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    cols: [],
    maxCols: 10,
    showMoreRowNumber: undefined,
};

export const trafficSlice = createSlice({
    name: "traffic",
    initialState,
    reducers: {
        appendData: (state, x) => {
            state.data = state.data.concat(x.payload[0]);
            state.cols = x.payload[1];
        },
        updateShowMoreRowNumber: (state, rowNumber) => {
            state.showMoreRowNumber = rowNumber.payload;
        },
        resetTraffic: (state) => {
            state.data = [];
            state.cols = [];
            state.maxCols = 10;
            state.showMoreRowNumber = undefined;
        },
    },
});

export const { appendData, updateShowMoreRowNumber, resetTraffic } =
    trafficSlice.actions;

export default trafficSlice.reducer;
