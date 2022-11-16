import React from 'react';
import { Link } from 'react-router-dom';

function Sidenav() {
  return (

        <div className="sidenav">
            <center><span class="material-symbols-outlined">
                signal_cellular_alt
                </span></center>
            <Link to="/">Histogram</Link>
            <Link to="/timeseries">Timeseries</Link>
        </div>

  )
}

export default Sidenav