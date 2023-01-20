import React from "react";

export default function Alert({ testData }) {
    const alertDiv = document.getElementById("alert");
    if (alertDiv) {
        if (testData) {
            alertDiv.style.background = "red";
        } else {
            alertDiv.style.background = "black";
        }
    }

    return (
        <div className="alert">{testData && <center>Alert = 1</center>}</div>
    );
}
