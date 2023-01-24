import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    lastTrafficType: 0,
};

export const logSlice = createSlice({
    name: "log",
    initialState,
    reducers: {
        updateLog: (state, data) => {
            state.data = data.payload;
        },
        updateForAttack: (state) => {
            state.lastTrafficType = 1;
        },
        updateForNormal: (state) => {
            state.lastTrafficType = 0;
        },
        appendLog: (state, data) => {
            state.data = state.data.concat(data.payload);
        },
    },
});

export const { updateLog, updateForAttack, updateForNormal, appendLog } =
    logSlice.actions;

export default logSlice.reducer;
