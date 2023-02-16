import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateScatter } from "../redux/scatterSlice";
import { updateScrollPosition } from "../redux/scrollSlice";
import Plot from "react-plotly.js";

export default function Pie() {
    const categoryCount = useSelector((state) => state.scatter.categoryCount);
    const attackCategories = useSelector(
        (state) => state.scatter.attackCategories
    );
    const scrollPosition = useSelector(
        (state) => state.scroll.scrollPositions.pie
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

    useEffect(() => {
        const container = document.getElementById("pie");
        container.scrollTop = scrollPosition;

        const handleScroll = (event) => {
            const scrollTop = event.target.scrollTop;
            dispatch(updateScrollPosition[("pie", scrollTop)]);
        };

        container.addEventListener("scroll", handleScroll);

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
            container.removeEventListener("scroll", handleScroll);
        };
    }, [dispatch, scrollPosition]);

    return categoryCount ? (
        <div className="scatter" id="pie">
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
        <div className="scatter" id="pie">
            <h1>Creating Pie Chart</h1>
        </div>
    );
}
