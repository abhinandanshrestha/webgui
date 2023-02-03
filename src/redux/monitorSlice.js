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
    },
});

export const { monitoring, notMonitoring, setCustomTesting } =
    monitorSlice.actions;

export default monitorSlice.reducer;
