import React from "react";
import { useSelector } from "react-redux";

export default function Alert({ testData }) {
    const { attack } = useSelector((state)=>state.log);
    const alertDiv = document.getElementById("alert");
    if (alertDiv) {
        if (testData) {
            alertDiv.style.background = "red";
        } else {
            alertDiv.style.background = "black";
        }
    }

    return (
        <div className={attack}>{testData && <center>Alert = 1</center>}</div>
    );
}
