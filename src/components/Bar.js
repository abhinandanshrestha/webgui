import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateScatter } from "../redux/scatterSlice";
import Plot from "react-plotly.js";

export default function Bar() {
    const categoryCount = useSelector((state) => state.scatter.categoryCount);
    const attackCategories = useSelector(
        (state) => state.scatter.attackCategories
    );
    const dispatch = useDispatch();

    const attackTypePlots = attackCategories.map((category, index) => (
        <Plot
            key={index}
            data={[
                {
                    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    y: categoryCount[category],
                    type: "bar",
                    name: category,
                },
            ]}
            layout={{
                xaxis: { title: "Time (min)" },
                yaxis: { title: "Traffic" },
                title: `Attack ${category}`,
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

    return categoryCount ? (
        <div className="scatter">
            {categoryCount["attack"] && (
                <Plot
                    data={[
                        {
                            x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                            y: categoryCount["Type11"],
                            type: "bar",
                            name: "Normal Traffic",
                            marker: { color: "green" },
                        },
                        {
                            x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                            y: categoryCount["attack"],
                            type: "bar",
                            name: "Attack Traffic",
                            marker: { color: "red" },
                        },
                    ]}
                    layout={{
                        xaxis: { title: "Time (min)" },
                        yaxis: { title: "Traffic" },
                        title: "Bar Graph of Attack and Normal Data",
                    }}
                />
            )}
            {attackTypePlots && attackTypePlots}
        </div>
    ) : (
        <div className="scatter">
            <h1>Creating Bar Graph</h1>
        </div>
    );
}
