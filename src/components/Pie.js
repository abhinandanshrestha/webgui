import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateScatter } from "../redux/scatterSlice";
import Plot from "react-plotly.js";

export default function Pie() {
    const categoryCount = useSelector((state) => state.scatter.categoryCount);
    const attackCategories = useSelector(
        (state) => state.scatter.attackCategories
    );
    const dispatch = useDispatch();

    let totalCount = {};
    if (categoryCount) {
        Object.keys(categoryCount).forEach((category) => {
            totalCount[category] = 0;
            categoryCount[category].forEach((count) => {
                totalCount[category] += count;
            });
        });
    }
    // const attackTypePlots = attackCategories.map((category, index) => (
    //     <Plot
    //         key={index}
    //         data={[
    //             {
    //                 x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    //                 y: categoryCount[category],
    //                 type: "bar",
    //                 name: category,
    //             },
    //         ]}
    //         layout={{
    //             xaxis: { title: "Time (min)" },
    //             yaxis: { title: "Traffic" },
    //             title: `Attack ${category}`,
    //         }}
    //     />
    // ));

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
                            values: [
                                totalCount["Type11"],
                                totalCount["attack"],
                            ],
                            labels: ["Normal", "Attack"],
                            type: "pie",
                        },
                    ]}
                    layout={{
                        title: "Pie Chart of Attack and Normal Data",
                    }}
                />
            )}
            {attackCategories.length && (
                <Plot
                    data={[
                        {
                            values: attackCategories.map(
                                (category) => totalCount[category]
                            ),
                            labels: attackCategories,
                            type: "pie",
                        },
                    ]}
                    layout={{
                        title: "Pie Chart of different attack categories",
                    }}
                />
            )}
            {/* {attackTypePlots && attackTypePlots} */}
        </div>
    ) : (
        <div className="scatter">
            <h1>Creating Pie Chart</h1>
        </div>
    );
}
