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
            state.data = state.data.concat(data.payload);
            // TODO:: This can be improved
            let attack_count = 0;
            data.payload.forEach((load) => {
                if (parseInt(load.split(",")[1]) !== 11) {
                    attack_count += 1;
                }
            });
            if (attack_count) {
                state.lastTrafficType = 1;
            } else {
                state.lastTrafficType = 0;
            }
        },
        updateForAttack: (state) => {
            state.lastTrafficType = 1;
        },
        updateForNormal: (state) => {
            state.lastTrafficType = 0;
        },
        resetLog: (state) => {
            state.data = [];
            state.lastTrafficType = 0;
        },
    },
});

export const { updateLog, updateForAttack, updateForNormal, resetLog } =
    logSlice.actions;

export default logSlice.reducer;
