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
            <div className="buttonHolder">
                <span className="material-symbols-outlined">
                    signal_cellular_alt
                </span>
            </div>
            {customTesting ? (
                <div className="buttonHolder">
                    <Link to="/" onClick={startMonitoring}>
                        <button>Start Monitoring</button>
                    </Link>
                </div>
            ) : (
                <div className="buttonHolder">
                    <Link to="/">
                        <button>Traffic</button>
                    </Link>
                    <Link to="/form">
                        <button>Form</button>
                    </Link>
                    <Link to="/logs">
                        <button>Logs</button>
                    </Link>
                    <Link to="/scatter">
                        <button>Scatter Plot</button>
                    </Link>
                    <Link to="/bar">
                        <button>Bar Graph</button>
                    </Link>
                    <Link to="/pie">
                        <button>Pie Chart</button>
                    </Link>
                </div>
            )}
            {monitorState && (
                <div className="buttonHolder stopMonitoring">
                    <Link to="/" onClick={stopMonitoring}>
                        <button>Stop Monitoring</button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Sidenav;
