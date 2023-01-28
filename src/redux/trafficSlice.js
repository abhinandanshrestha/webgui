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
        updateData: (state, x) => {
            state.data = x.payload[0];
            state.cols = x.payload[1];
        },
        updateShowMoreRowNumber: (state, rowNumber) => {
            console.log(rowNumber);
            state.showMoreRowNumber = rowNumber.payload;
        },
    },
});

export const { updateData, updateShowMoreRowNumber } = trafficSlice.actions;

export default trafficSlice.reducer;
