import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateScatter } from "../redux/scatterSlice";
import { updateScrollPosition } from "../redux/scrollSlice";
import Plot from "react-plotly.js";

export default function Pie() {
    const categoryCount = useSelector((state) => state.scatter.categoryCount);
    const attackCategories = useSelector(
        (state) => state.scatter.attackCategories
    );
    const containerRef = useRef(null);
    const scrollPosition =
        useSelector((state) => state.scroll.scrollPositions.pie) || 0;
    const storedScrollPosition = useRef(scrollPosition);
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
        const container = containerRef.current;

        const handleScroll = (event) => {
            const scrollTop = event.target.scrollTop;
            storedScrollPosition.current = scrollTop;
            dispatch(updateScrollPosition(["pie", scrollTop]));
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
                <h1>Pie Chart</h1>
            </div>
            {categoryCount["attack"] && (
                <Plot
                    data={[
                        {
                            values: [
                                totalCount["BENIGN"],
                                totalCount["attack"],
                            ],
                            labels: ["Normal", "Attack"],
                            type: "pie",
                        },
                    ]}
                    layout={{
                        title: "Pie Chart of Attack and Normal Data",
                    }}
                    style={{ width: "100%" }}
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
                    style={{
                        width: "100%",
                    }}
                />
            )}
            {/* {attackTypePlots && attackTypePlots} */}
        </div>
    ) : (
        <div className="loading">
            <h1>Creating Pie Chart</h1>
        </div>
    );
}
