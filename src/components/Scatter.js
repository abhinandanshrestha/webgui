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
    const colors = useSelector((state) => state.scatter.colors);
    const containerRef = useRef(null);
    const scrollPosition = useSelector(
        (state) => state.scroll.scrollPositions.scatter
    );
    const storedScrollPosition = useRef(scrollPosition);
    const dispatch = useDispatch();

    const attackTypePlotsAll = (
        <Plot
            data={attackCategories.map((category) => ({
                x: Array.from({ length: 60 }, (_, i) => i + 1),
                y: categoryCount[category],
                type: "scatter",
                mode: "lines+markers",
                name: category,
                line: {
                    dash: "dashdot",
                },
                marker: { color: colors[category] },
            }))}
            layout={{
                xaxis: {
                    title: "Time (sec)",
                    tickmode: "linear",
                    dtick: 1,
                    range: [1, 60],
                },
                yaxis: { title: "Traffic" },
                title: "Types of Attack",
            }}
            style={{
                width: "100%",
            }}
        />
    );

    const attackTypePlots = attackCategories.map((category, index) => (
        <Plot
            key={index}
            data={[
                {
                    x: Array.from({ length: 60 }, (_, i) => i + 1),
                    y: categoryCount[category],
                    type: "scatter",
                    mode: "lines+markers",
                    name: category,
                    line: {
                        dash: "dashdot",
                    },
                    marker: { color: colors[category] },
                },
            ]}
            layout={{
                xaxis: {
                    title: "Time (sec)",
                    tickmode: "linear",
                    dtick: 1,
                    range: [1, 60],
                },
                yaxis: { title: "Traffic" },
                title: category,
            }}
            style={{
                width: "100%",
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

        const scatterHandle = setInterval(fetchScatterData, 1000);
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
                            x: Array.from({ length: 60 }, (_, i) => i + 1),
                            y: categoryCount["BENIGN"],
                            type: "scatter",
                            mode: "lines+markers",
                            name: "Normal Traffic",
                            line: {
                                dash: "dashdot",
                            },
                            marker: { color: colors["BENIGN"] },
                        },
                        {
                            x: Array.from({ length: 60 }, (_, i) => i + 1),
                            y: categoryCount["attack"],
                            type: "scatter",
                            mode: "lines+markers",
                            name: "Attack Traffic",
                            line: {
                                dash: "dashdot",
                            },
                            marker: { color: colors["attack"] },
                        },
                    ]}
                    layout={{
                        xaxis: {
                            title: "Time (sec)",
                            tickmode: "linear",
                            dtick: 1,
                            range: [1, 60],
                        },
                        yaxis: { title: "Traffic" },
                        title: "Scatter Plot of Attack and Normal Traffic",
                    }}
                    style={{
                        width: "100%",
                    }}
                />
            )}
            {attackTypePlotsAll && attackTypePlotsAll}
            {attackTypePlots && attackTypePlots}
        </div>
    ) : (
        <div className="loading">
            <h1>Creating Scatter Plot</h1>
        </div>
    );
}
