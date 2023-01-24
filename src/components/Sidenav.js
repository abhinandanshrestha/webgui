import React from "react";
import { Link } from "react-router-dom";

function Sidenav() {
    return (
        <div className="sidenav">
            <center>
                <span className="material-symbols-outlined">
                    signal_cellular_alt
                </span>
            </center>
            {/* <Link to="/">Histogram</Link> */}
            {/* <Link to="/timeseries">Timeseries</Link> */}
            <Link to="/">Traffic</Link>
            <Link to="/form">Form</Link>
            <Link to="/logs">Logs</Link>
            <Link to="/scatter">Scatter Plot</Link>
            <Link to="/bar">Bar Graph</Link>
        </div>
    );
}

export default Sidenav;
