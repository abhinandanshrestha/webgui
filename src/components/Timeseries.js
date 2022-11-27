import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import io from "socket.io-client";
const serverIp = "http://localhost:3001";
const socket = io.connect(serverIp);

function Timeseries() {
    let y = [];
    let x = [];
    // let plotData = []
    // const [data, setData] = useState([]);
    const [plotData, setPlotData] = useState([]);
    const fetchData = () => {
        socket.on("sent from the server", (data, columns) => {
            // setData(data);
            // console.log(columns[0])
            // console.log(data);
            y = data.map((x) => x[columns[12].accessorKey]);
            console.log(y);
            x = [...new Set(y)];
            y = x.map((a) => y.filter((v) => v === a).length);
            console.log(x);
            setPlotData([
                {
                    x: x,
                    y: y,
                    type: "bar",
                },
            ]);
        });
    };
    // console.log(data)
    useEffect(() => {
        fetchData();
    }, []);

    // console.log(y)

    return (
        <div className="charts">
            <center>
                <Plot data={plotData} />
                {/* {String(data)} */}
            </center>
        </div>
    );
}

export default Timeseries;
