import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    categoryCount: undefined,
    attackCategories: [],
    colors: {
        BENIGN: "#2ca02c", // a shade of green
        Bot: "#9467bd", // a shade of purple
        "FTP-Patator": "#8c564b", // a shade of brown
        "SSH-Patator": "#ff7f0e", // a shade of orange
        Infiltration: "#d62728", // a shade of red
        "DoS slowloris": "#1f77b4", // a shade of blue
        "DoS Slowhttptest": "#e377c2", // a shade of pink
        "DoS Hulk": "#bcbd22", // a shade of yellow-green
        "DoS GoldenEye": "#17becf", // a shade of turquoise
        Heartbleed: "#aec7e8", // a light shade of blue
        PortScan: "#ffbb78", // a light shade of orange
        DDoS: "#98df8a", // a light shade of green
        "Web Attack � Brute Force": "#7f7f7f", // a shade of gray
        "Web Attack � XSS": "#c5b0d5", // a light shade of purple
        "Web Attack � Sql Injection": "#d62790", // a shade of pink-purple
        attack: "#ff0000", // red
    },
};

export const scatterSlice = createSlice({
    name: "scatter",
    initialState,
    reducers: {
        updateScatter: (state, data) => {
            state.data = data.payload[0];
            state.categoryCount = data.payload[1];
            let categories = Object.keys(data.payload[1]);
            let attackCategories = [];
            categories.forEach((category) => {
                if (category !== "attack" && category !== "BENIGN") {
                    attackCategories.push(category);
                }
            });
            state.attackCategories = attackCategories;
        },
        resetScatter: (state) => {
            state.data = [];
            state.categoryCount = undefined;
            state.attackCategories = [];
            state.colors = {
                BENIGN: "#2ca02c", // a shade of green
                Bot: "#9467bd", // a shade of purple
                "FTP-Patator": "#8c564b", // a shade of brown
                "SSH-Patator": "#ff7f0e", // a shade of orange
                Infiltration: "#d62728", // a shade of red
                "DoS slowloris": "#1f77b4", // a shade of blue
                "DoS Slowhttptest": "#e377c2", // a shade of pink
                "DoS Hulk": "#bcbd22", // a shade of yellow-green
                "DoS GoldenEye": "#17becf", // a shade of turquoise
                Heartbleed: "#aec7e8", // a light shade of blue
                PortScan: "#ffbb78", // a light shade of orange
                DDoS: "#98df8a", // a light shade of green
                "Web Attack � Brute Force": "#7f7f7f", // a shade of gray
                "Web Attack � XSS": "#c5b0d5", // a light shade of purple
                "Web Attack � Sql Injection": "#d62790", // a shade of pink-purple
                attack: "#ff0000", // red
            };
        },
    },
});

export const { updateScatter, resetScatter } = scatterSlice.actions;

export default scatterSlice.reducer;
