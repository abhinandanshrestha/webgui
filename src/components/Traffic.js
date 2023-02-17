import React from "react";
import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { appendData, updateShowMoreRowNumber } from "../redux/trafficSlice";
import { updateScrollPosition } from "../redux/scrollSlice";

export default function Traffic() {
    const dispatch = useDispatch();
    const trafficData = useSelector((state) => state.traffic.data);
    const trafficCols = useSelector((state) => state.traffic.cols);
    const maxCols = useSelector((state) => state.traffic.maxCols);
    const showMoreRowNumber = useSelector(
        (state) => state.traffic.showMoreRowNumber
    );
    const containerRef = useRef(null);
    const scrollPosition =
        useSelector((state) => state.scroll.scrollPositions.traffic) || 0;
    const storedScrollPosition = useRef(scrollPosition);

    useEffect(() => {
        const container = containerRef.current;
        container.scrollTop = storedScrollPosition.current;

        const handleScroll = (event) => {
            const scrollTop = event.target.scrollTop;
            dispatch(updateScrollPosition(["traffic", scrollTop]));
        };

        container.addEventListener("scroll", handleScroll);

        const fetchTrafficData = () => {
            const url = `http://localhost:3001/getTrafficData?dataCount=${encodeURIComponent(
                trafficData.length
            )}`;
            fetch(url, {
                method: "GET",
            })
                .then((res) => {
                    return res.json();
                })
                .then(({ data, cols }) => {
                    dispatch(appendData([data, cols]));
                });
        };

        fetchTrafficData();

        const trafficHandle = setInterval(fetchTrafficData, 5000);

        return () => {
            clearInterval(trafficHandle);
            container.removeEventListener("scroll", handleScroll);
        };
    }, [dispatch, trafficData.length]);

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

    if (showMoreRowNumber !== undefined) {
        const showMoreContent = trafficData[showMoreRowNumber].map(
            (data, index) => (
                <div key={index}>
                    {trafficCols[index]}
                    {":"}
                    {data}
                </div>
            )
        );

        const closeShowMore = () => {
            dispatch(updateShowMoreRowNumber(undefined));
        };

        return (
            <div className="traffic" ref={containerRef}>
                <h1>Row: {showMoreRowNumber}</h1>
                <hr />
                <div className="showMore">
                    {showMoreContent}
                    <div>
                        <button onClick={closeShowMore}>Close</button>
                    </div>
                </div>
            </div>
        );
    } else {
        if (trafficData.length) {
            return (
                <div className="traffic" ref={containerRef}>
                    <table>
                        <thead>
                            <tr>{tableHead}</tr>
                        </thead>
                        <tbody>{tableRows}</tbody>
                    </table>
                </div>
            );
        } else {
            return (
                <div className="traffic" ref={containerRef}>
                    <h1>Waiting for Traffic Data</h1>
                </div>
            );
        }
    }
}
