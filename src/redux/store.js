import { configureStore } from "@reduxjs/toolkit";
import monitorReducer from "./monitorSlice";
import trafficReducer from "./trafficSlice";
import logReducer from "./logSlice";
import scatterReducer from "./scatterSlice";

export const store = configureStore({
    reducer: {
        monitor: monitorReducer,
        traffic: trafficReducer,
        log: logReducer,
        scatter: scatterReducer,
    },
});
