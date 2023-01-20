import React, { useState } from "react";
import { useEffect } from "react";
const moment = require("moment");

export default function Logs() {
    const [logs, setLogs] = useState([]);

    const fetchLogs = () => {
        fetch("http://localhost:3001/get-logs", {
            method: "GET",
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setLogs(data.logs);
            });
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const logEntries = logs.map((l, index) => (
        <tr key={index}>
            <td>{index}</td>
            <td>{moment(parseInt(l.split(",")[0])).format("LLLL")}</td>
            <td>{l.split(",")[1]}</td>
        </tr>
    ));

    return (
        <div className="logs">
            <h1>Logs</h1>
            <button onClick={fetchLogs}>Refresh</button>
            <br />
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Timestamp</th>
                        <th>Attack Type</th>
                    </tr>
                </thead>
                <tbody>{logEntries}</tbody>
            </table>
        </div>
    );
}
