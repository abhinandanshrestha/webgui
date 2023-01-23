import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false,
};

export const monitorSlice = createSlice({
    name: "monitor",
    initialState,
    reducers: {
        monitoring: (state) => {
            state.value = true;
        },
        notMonitoring: (state) => {
            state.value = false;
        },
    },
});

export const { monitoring, notMonitoring } = monitorSlice.actions;

export default monitorSlice.reducer;
