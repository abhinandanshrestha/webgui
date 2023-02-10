import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    monitoring,
    notMonitoring,
    setCustomTesting,
} from "../redux/monitorSlice";

function Sidenav() {
    const monitorState = useSelector((state) => state.monitor.value);
    const customTesting = useSelector((state) => state.monitor.customTesting);
    const dispatch = useDispatch();

    const startMonitoring = () => {
        fetch("http://localhost:3001/startMonitoring", {
            method: "POST",
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.state) {
                    dispatch(monitoring());
                }
            });
        dispatch(setCustomTesting(false));
    };

    const stopMonitoring = () => {
        fetch("http://localhost:3001/stopMonitoring", { method: "POST" })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.ok) {
                    dispatch(notMonitoring());
                }
            });
    };

    return (
        <div className="sidenav">
            <center>
                <span className="material-symbols-outlined">
                    signal_cellular_alt
                </span>
            </center>
            {customTesting ? (
                <Link to="/" onClick={startMonitoring}>
                    Start Monitoring
                </Link>
            ) : (
                <div>
                    <Link to="/">Traffic</Link>
                    <Link to="/form">Form</Link>
                    <Link to="/logs">Logs</Link>
                    <Link to="/scatter">Scatter Plot</Link>
                    <Link to="/bar">Bar Graph</Link>
                    <Link to="/pie">Pie Chart</Link>
                </div>
            )}
            <hr />
            {monitorState && (
                <Link to="/" onClick={stopMonitoring}>
                    Stop Monitoring
                </Link>
            )}
        </div>
    );
}

export default Sidenav;
