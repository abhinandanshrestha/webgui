import { configureStore } from "@reduxjs/toolkit";
import monitorReducer from "./monitorSlice";
import trafficReducer from "./trafficSlice";
import formReducer from "./formSlice";
import logReducer from "./logSlice";
import scatterReducer from "./scatterSlice";
import scrollReducer from "./scrollSlice";

export const store = configureStore({
    reducer: {
        monitor: monitorReducer,
        traffic: trafficReducer,
        form: formReducer,
        log: logReducer,
        scatter: scatterReducer,
        scroll: scrollReducer,
    },
});
