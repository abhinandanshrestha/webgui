import React from "react";
import { useSelector } from "react-redux";

export default function Alert({ testData }) {
    const lastTrafficType = useSelector((state) => state.log.lastTrafficType);

    return (
        <div className="alert">
            <div className={lastTrafficType ? "attack" : "benign"}>{lastTrafficType ? "NEW ATTACK TRAFFIC DETECTED!!!" : "ALL GOOD!!"}</div>
        </div>
    );
}
