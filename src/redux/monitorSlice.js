import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false,
    customTesting: false,
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
        setCustomTesting: (state, data) => {
            state.customTesting = data.payload;
        },
        resetMonitor: (state) => {
            state.value = false;
            state.customTesting = false;
        },
    },
});

export const { monitoring, notMonitoring, setCustomTesting, resetMonitor } =
    monitorSlice.actions;

export default monitorSlice.reducer;
