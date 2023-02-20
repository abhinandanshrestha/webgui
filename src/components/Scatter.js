import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateScatter } from "../redux/scatterSlice";
import { updateScrollPosition } from "../redux/scrollSlice";
import Plot from "react-plotly.js";

export default function Scatter() {
    const categoryCount = useSelector((state) => state.scatter.categoryCount);
    const attackCategories = useSelector(
        (state) => state.scatter.attackCategories
    );
    const containerRef = useRef(null);
    const scrollPosition = useSelector(
        (state) => state.scroll.scrollPositions.scatter
    );
    const storedScrollPosition = useRef(scrollPosition);
    const dispatch = useDispatch();

    const attackTypePlots = attackCategories.map((category, index) => (
        <Plot
            key={index}
            data={[
                {
                    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    y: categoryCount[category],
                    type: "scatter",
                    mode: "lines+markers",
                    name: category,
                    line: {
                        dash: "dashdot",
                    },
                },
            ]}
            layout={{
                xaxis: { title: "Time (min)" },
                yaxis: { title: "Traffic" },
                title: category,
            }}
        />
    ));

    useEffect(() => {
        const container = containerRef.current;

        const handleScroll = (event) => {
            const scrollTop = event.target.scrollTop;
            storedScrollPosition.current = scrollTop;
            dispatch(updateScrollPosition(["scatter", scrollTop]));
        };

        if (container) {
            if (storedScrollPosition.current !== 0) {
                container.scrollTop = storedScrollPosition.current;
            }
            container.addEventListener("scroll", handleScroll);
        }

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
            if (container) {
                container.removeEventListener("scroll", handleScroll);
            }
        };
    }, [dispatch]);

    return categoryCount ? (
        <div className="scatter" ref={containerRef}>
            <div className="titleHolder">
                <h1>Scatter Plot</h1>
            </div>
            {categoryCount["attack"] && (
                <Plot
                    data={[
                        {
                            x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                            y: categoryCount["BENIGN"],
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
                            y: categoryCount["attack"],
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
            )}
            {attackTypePlots && attackTypePlots}
        </div>
    ) : (
        <div className="loading">
            <h1>Creating Scatter Plot</h1>
        </div>
    );
}
