import { useState, useEffect } from "react";
import Plot from "react-plotly.js";

export default function Scatter() {
    const [scatterData, setScatterData] = useState([
        Array(10).fill(0),
        Array(10).fill(0),
    ]);

    const fetchScatterData = () => {
        fetch("http://localhost:3001/get-scatterData", {
            method: "GET",
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setScatterData(data.scatterData);
                console.log(data.scatterData);
            });
    };

    useEffect(() => {
        const scatterHandle = setInterval(fetchScatterData, 5000);
        return () => {
            clearInterval(scatterHandle);
        };
    }, []);

    return (
        <div className="scatter">
            <Plot
                data={[
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: scatterData[1],
                        type: "scatter",
                        mode: "lines+markers",
                        name: "Normal Traffic",
                        line: {
                            dash: "dashdot",
                        },
                        marker: { color: "green" },
                    },
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: scatterData[0],
                        type: "scatter",
                        mode: "lines+markers",
                        name: "Attack Traffic",
                        line: {
                            dash: "dashdot",
                        },
                        marker: { color: "red" },
                    },
                ]}
                layout={{
                    xaxis: { title: "Time (min)" },
                    yaxis: { title: "Traffic" },
                }}
                // layout={{ width: 320, height: 240, title: "Scatter Plot of Attack and Normal Data" }}
            />
            <Plot
                data={[
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: scatterData[2],
                        type: "scatter",
                        mode: "lines+markers",
                        name: "Type-0",
                        line: {
                            dash: "dashdot",
                        },
                        // marker: { color: "green" },
                    },
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: scatterData[3],
                        type: "scatter",
                        mode: "lines+markers",
                        name: "Type-1",
                        line: {
                            dash: "dashdot",
                        },
                        // marker: { color: "green" },
                    },
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: scatterData[4],
                        type: "scatter",
                        mode: "lines+markers",
                        name: "Type-2",
                        line: {
                            dash: "dashdot",
                        },
                        // marker: { color: "red" },
                    },
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: scatterData[5],
                        type: "scatter",
                        mode: "lines+markers",
                        name: "Type-3",
                        line: {
                            dash: "dashdot",
                        },
                        // marker: { color: "red" },
                    },
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: scatterData[6],
                        type: "scatter",
                        mode: "lines+markers",
                        name: "Type-4",
                        line: {
                            dash: "dashdot",
                        },
                        // marker: { color: "red" },
                    },
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: scatterData[7],
                        type: "scatter",
                        mode: "lines+markers",
                        name: "Type-5",
                        line: {
                            dash: "dashdot",
                        },
                        // marker: { color: "red" },
                    },
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: scatterData[8],
                        type: "scatter",
                        mode: "lines+markers",
                        name: "Type-6",
                        line: {
                            dash: "dashdot",
                        },
                        // marker: { color: "red" },
                    },
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: scatterData[9],
                        type: "scatter",
                        mode: "lines+markers",
                        name: "Type-7",
                        line: {
                            dash: "dashdot",
                        },
                        // marker: { color: "red" },
                    },
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: scatterData[10],
                        type: "scatter",
                        mode: "lines+markers",
                        name: "Type-8",
                        line: {
                            dash: "dashdot",
                        },
                        // marker: { color: "red" },
                    },
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: scatterData[10],
                        type: "scatter",
                        mode: "lines+markers",
                        name: "Type-9",
                        line: {
                            dash: "dashdot",
                        },
                        // marker: { color: "red" },
                    },
                ]}
                layout={{
                    xaxis: { title: "Time (min)" },
                    yaxis: { title: "Traffic" },
                }}
                // layout={{ width: 320, height: 240, title: "Scatter Plot of Attack Types" }}
            />
        </div>
    );
}
