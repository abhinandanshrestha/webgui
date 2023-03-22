import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { monitoring, notMonitoring } from "./redux/monitorSlice";
import { updateLog } from "./redux/logSlice";

import Traffic from "./components/Traffic";
import Sidenav from "./components/Sidenav";
import Alert from "./components/Alert";
import Logs from "./components/Logs";
import Scatter from "./components/Scatter";
import Landing from "./components/Landing";
import Bar from "./components/Bar";
import Form from "./components/Form";
import Pie from "./components/Pie";
import ShowMore from "./components/ShowMore";
import { appendData } from "./redux/trafficSlice";

function App() {
    const dispatch = useDispatch();
    const monitorState = useSelector((state) => state.monitor.value);
    const lastTrafficType = useSelector((state) => state.log.lastTrafficType);
    const customTesting = useSelector((state) => state.monitor.customTesting);
    const { attack } = useSelector((state) => state.log);
    const showMoreRowNumber = useSelector(
        (state) => state.traffic.showMoreRowNumber
    );
    const logsLength = useSelector((state) => state.log.data.length);
    const trafficDataLength = useSelector((state) => state.traffic.data.length);

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

        const fetchTrafficData = () => {
            const url = `http://localhost:3001/getTrafficData?dataCount=${encodeURIComponent(
                trafficDataLength
            )}`;
            fetch(url, {
                method: "GET",
            })
                .then((res) => {
                    return res.json();
                })
                .then(({ data, cols }) => {
                    dispatch(appendData([data, cols]));
                });
        };

        const fetchLogData = () => {
            const url = `http://localhost:3001/getLogData?logCount=${encodeURIComponent(
                logsLength
            )}`;
            fetch(url, {
                method: "GET",
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    dispatch(updateLog(data.logs));
                });
        };

        fetchMonitorState();

        const monitorHandle = setInterval(fetchMonitorState, 1000);
        const trafficHandle = setInterval(fetchTrafficData, 1000);
        const logHandle = setInterval(fetchLogData, 1000);

        return () => {
            clearInterval(monitorHandle);
            clearInterval(trafficHandle);
            clearInterval(logHandle);
        };
    }, [dispatch, logsLength, trafficDataLength]);

    return monitorState || customTesting ? (
        <Router>
            <div className="container">
                <div className="mathi_div">
                    <Sidenav />
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={
                                showMoreRowNumber ? <ShowMore /> : <Traffic />
                            }
                        />
                        <Route exact path="/form" element={<Form />} />
                        <Route exact path="/logs" element={<Logs />} />
                        <Route exact path="/scatter" element={<Scatter />} />
                        <Route exact path="/bar" element={<Bar />} />
                        <Route exact path="/pie" element={<Pie />} />
                    </Routes>
                </div>
                <div className={`tala_div ${attack}`} id="alert">
                    <Alert testData={lastTrafficType} />
                </div>
            </div>
        </Router>
    ) : (
        <Router>
            <Landing />
        </Router>
    );
}

export default App;
