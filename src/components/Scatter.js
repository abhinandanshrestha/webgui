import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateScatter } from "../redux/scatterSlice";
import Plot from "react-plotly.js";

export default function Scatter() {
    const normal = useSelector((state) => state.scatter.normal);
    const attack = useSelector((state) => state.scatter.attack);
    const attackTypes = useSelector((state) => state.scatter.attackTypes);
    const dispatch = useDispatch();

    console.log(attackTypes);

    const attackTypePlots = attackTypes.map((type, index) => (
        <Plot
            key={index}
            data={[
                {
                    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    y: type,
                    type: "scatter",
                    mode: "lines+markers",
                    name: `Type-${index}`,
                    line: {
                        dash: "dashdot",
                    },
                },
            ]}
            layout={{
                xaxis: { title: "Time (min)" },
                yaxis: { title: "Traffic" },
                title: `Attack Type-${index}`,
            }}
        />
    ));

    useEffect(() => {
        const fetchScatterData = () => {
            fetch("http://localhost:3001/get-scatterData", {
                method: "GET",
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    dispatch(updateScatter(data.scatterData));
                });
        };

        const scatterHandle = setInterval(fetchScatterData, 5000);
        return () => {
            clearInterval(scatterHandle);
        };
    }, [dispatch]);

    return normal.length ? (
        <div className="scatter">
            <Plot
                data={[
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: normal,
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
                        y: attack,
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
                    title: "Scatter Plot of Attack and Normal Traffic",
                }}
            />
            {attackTypePlots && attackTypePlots}
        </div>
    ) : (
        <div className="scatter">
            <h1>Creating Scatter Plot</h1>
        </div>
    );
}
