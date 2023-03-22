import React from "react";
import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateShowMoreRowNumber } from "../redux/trafficSlice";
import { updateScrollPosition } from "../redux/scrollSlice";

export default function Traffic() {
    const dispatch = useDispatch();
    const trafficData = useSelector((state) => state.traffic.data);
    const trafficCols = useSelector((state) => state.traffic.cols);
    const maxCols = useSelector((state) => state.traffic.maxCols);
    const containerRef = useRef(null);
    const scrollPosition = useSelector(
        (state) => state.scroll.scrollPositions.traffic
    );
    const storedScrollPosition = useRef(scrollPosition);

    useEffect(() => {
        const container = containerRef.current;

        const handleScroll = (event) => {
            const scrollTop = event.target.scrollTop;
            storedScrollPosition.current = scrollTop;
            dispatch(updateScrollPosition(["traffic", scrollTop]));
        };

        if (container) {
            if (storedScrollPosition.current !== 0) {
                container.scrollTop = storedScrollPosition.current;
            }
            container.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener("scroll", handleScroll);
            }
        };
    }, [dispatch]);

    const showMore = (e) => {
        const rowNumber = e.target.getAttribute("data-index");
        dispatch(updateShowMoreRowNumber(rowNumber));
    };

    const tableRows = trafficData.map((rowData, index) => (
        <tr key={index}>
            {rowData.slice(0, maxCols).map((data, i) => (
                <td key={i}>{data}</td>
            ))}
            {
                <td>
                    <button onClick={showMore} data-index={index}>
                        Show More
                    </button>
                </td>
            }
        </tr>
    ));

    const tableHead = trafficCols
        .slice(0, maxCols)
        .map((col, index) => <th key={index}>{col}</th>);

    return trafficData.length ? (
        <div className="traffic" ref={containerRef}>
            <div className="titleHolder">
                <h1>Traffic</h1>
            </div>
            <table>
                <thead>
                    <tr>
                        {tableHead}
                        <th>...</th>
                    </tr>
                </thead>
                <tbody>{tableRows}</tbody>
            </table>
        </div>
    ) : (
        <div className="loading">
            <div>
                <h1>Waiting for Traffic Data</h1>
            </div>
        </div>
    );
}
