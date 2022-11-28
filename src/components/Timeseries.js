import Plot from "react-plotly.js";

function Timeseries({ data, columns }) {
    let y = [];
    let x = [];
    y = data.map((a) => a[columns[0].accessorKey]);
    x = [...new Set(y)];
    y = x.map((a) => y.filter((v) => v === a).length);
    const plotData = [
        {
            x: x,
            y: y,
            type: "bar",
        },
    ];
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
