import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { appendData, updateShowMoreRowNumber } from "../redux/trafficSlice";

export default function Traffic() {
    const dispatch = useDispatch();
    const trafficData = useSelector((state) => state.traffic.data);
    const trafficCols = useSelector((state) => state.traffic.cols);
    const maxCols = useSelector((state) => state.traffic.maxCols);
    const showMoreRowNumber = useSelector(
        (state) => state.traffic.showMoreRowNumber
    );

    useEffect(() => {
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
                <p key={index}>
                    {trafficCols[index]}
                    {":"}
                    {data}
                </p>
            )
        );

        const closeShowMore = () => {
            dispatch(updateShowMoreRowNumber(undefined));
        };

        return (
            <div className="traffic">
                <h1>Row: {showMoreRowNumber}</h1>
                <hr />
                {showMoreContent}
                <button onClick={closeShowMore}>Close</button>
            </div>
        );
    } else {
        if (trafficData.length) {
            return (
                <div className="traffic">
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
                <div className="traffic">
                    <h1>Waiting for Traffic Data</h1>
                </div>
            );
        }
    }
}
