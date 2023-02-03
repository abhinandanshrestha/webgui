import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { monitoring, setCustomTesting } from "../redux/monitorSlice";

function Sidenav() {
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
                </div>
            )}
        </div>
    );
}

export default Sidenav;
