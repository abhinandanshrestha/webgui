import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateScatter } from "../redux/scatterSlice";
import Plot from "react-plotly.js";

export default function Bar() {
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
                    type: "bar",
                    // mode: "lines+markers",
                    name: `Type-${index}`,
                    // line: {
                    //     dash: "dashdot",
                    // },
                    // marker: { color: "green" },
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

    return (
        <div className="scatter">
            {normal && (
                <Plot
                    data={[
                        {
                            x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                            y: normal,
                            type: "bar",
                            // mode: "lines+markers",
                            name: "Normal Traffic",
                            // line: {
                            //     dash: "dashdot",
                            // },
                            marker: { color: "green" },
                        },
                        {
                            x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                            y: attack,
                            type: "bar",
                            // mode: "lines+markers",
                            name: "Attack Traffic",
                            // line: {
                            //     dash: "dashdot",
                            // },
                            marker: { color: "red" },
                        },
                    ]}
                    layout={{
                        xaxis: { title: "Time (min)" },
                        yaxis: { title: "Traffic" },
                    }}
                    // layout={{ width: 320, height: 240, title: "Scatter Plot of Attack and Normal Data" }}
                />
            )}
            <hr />
            {attackTypePlots && attackTypePlots}
        </div>
    );
}