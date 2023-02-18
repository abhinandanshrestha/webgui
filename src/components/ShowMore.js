import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateShowMoreRowNumber } from "../redux/trafficSlice";

export default function ShowMore() {
    const dispatch = useDispatch();
    const trafficData = useSelector((state) => state.traffic.data);
    const showMoreRowNumber = useSelector(
        (state) => state.traffic.showMoreRowNumber
    );
    const trafficCols = useSelector((state) => state.traffic.cols);

    const showMoreContent = trafficData[showMoreRowNumber].map(
        (data, index) => (
            <div key={index}>
                {trafficCols[index]}
                {" : "}
                <b>{data}</b>
            </div>
        )
    );

    const closeShowMore = () => {
        dispatch(updateShowMoreRowNumber(undefined));
    };

    return (
        <div className="showMore">
            <div className="titleHolder">
                <h1>Row: {showMoreRowNumber}</h1>
            </div>
            <div className="contentHolder">
                {showMoreContent}
                <div>
                    <button onClick={closeShowMore}>Close</button>
                </div>
            </div>
        </div>
    );
}
