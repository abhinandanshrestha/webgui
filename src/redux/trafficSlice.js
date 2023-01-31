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
    },
});

export const { appendData, updateShowMoreRowNumber } = trafficSlice.actions;

export default trafficSlice.reducer;
