import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { monitoring, notMonitoring } from "./redux/monitorSlice";
// import { updateForAttack, updateForNormal } from "./redux/logSlice";

import Traffic from "./components/Traffic";
import Sidenav from "./components/Sidenav";
import Alert from "./components/Alert";
import Logs from "./components/Logs";
import Scatter from "./components/Scatter";
import Landing from "./components/Landing";
import Bar from "./components/Bar";
import Form from "./components/Form";
import Pie from "./components/Pie";

// TODO ---> Remember the scroll state of components when returning back after visiting another component

function App() {
    const dispatch = useDispatch();
    const monitorState = useSelector((state) => state.monitor.value);
    const lastTrafficType = useSelector((state) => state.log.lastTrafficType);
    const customTesting = useSelector((state) => state.monitor.customTesting);

    useEffect(() => {
        const fetchMonitorState = () => {
            fetch("http://localhost:3001/getMonitorState", {
                method: "GET",
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    if (data.state) {
                        dispatch(monitoring());
                    } else {
                        dispatch(notMonitoring());
                    }
                });
        };

        fetchMonitorState();

        const monitorHandle = setInterval(fetchMonitorState, 5000);

        return () => {
            clearInterval(monitorHandle);
        };
    }, [dispatch]);

    return monitorState || customTesting ? (
        <Router>
            <div className="container">
                <div className="mathi_div">
                    <Sidenav />
                    <Routes>
                        <Route exact path="/" element={<Traffic />} />
                        <Route exact path="/form" element={<Form />} />
                        <Route exact path="/logs" element={<Logs />} />
                        <Route exact path="/scatter" element={<Scatter />} />
                        <Route exact path="/bar" element={<Bar />} />
                        <Route exact path="/pie" element={<Pie />} />
                    </Routes>
                </div>
                <div className="tala_div" id="alert">
                    <Alert testData={lastTrafficType} />
                </div>
            </div>
        </Router>
    ) : (
        <Router>
            <Landing />;
        </Router>
    );
}

export default App;
