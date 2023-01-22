import Plot from "react-plotly.js";

export default function Scatter({ scatterData }) {
    return (
        <div className="scatter">
            <Plot
                data={[
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        // y: [2, 6, 3, 5, 6, 1, 3, 8, 4, 6],
                        y: scatterData[1],
                        type: "scatter",
                        mode: "lines+markers",
                        marker: { color: "green" },
                    },
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        // y: [-2, -6, -3, -5, -6, -1, -3, -8, -4, -6],
                        y: scatterData[0],
                        type: "scatter",
                        mode: "lines+markers",
                        marker: { color: "red" },
                    },
                ]}
                // layout={{ width: 320, height: 240, title: "Scatter Plot of Attack and Normal Data" }}
            />
            <Plot
                data={[
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: scatterData[2],
                        type: "scatter",
                        mode: "lines+markers",
                        // marker: { color: "green" },
                    },
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: scatterData[3],
                        type: "scatter",
                        mode: "lines+markers",
                        // marker: { color: "red" },
                    },
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: scatterData[4],
                        type: "scatter",
                        mode: "lines+markers",
                        // marker: { color: "red" },
                    },
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: scatterData[5],
                        type: "scatter",
                        mode: "lines+markers",
                        // marker: { color: "red" },
                    },

                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: scatterData[6],
                        type: "scatter",
                        mode: "lines+markers",
                        // marker: { color: "red" },
                    },
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: scatterData[7],
                        type: "scatter",
                        mode: "lines+markers",
                        // marker: { color: "red" },
                    },
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: scatterData[8],
                        type: "scatter",
                        mode: "lines+markers",
                        // marker: { color: "red" },
                    },
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: scatterData[9],
                        type: "scatter",
                        mode: "lines+markers",
                        // marker: { color: "red" },
                    },
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: scatterData[10],
                        type: "scatter",
                        mode: "lines+markers",
                        // marker: { color: "red" },
                    },
                ]}
                // layout={{ width: 320, height: 240, title: "Scatter Plot of Attack Types" }}
            />
        </div>
    );
}
