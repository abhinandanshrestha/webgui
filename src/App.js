import Sidenav from "./components/Sidenav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import StackedAreaChart from "./components/StackedAreaChart";
import Traffic from "./components/Traffic";
import Alert from "./components/Alert";
// import Timeseries from "./components/Timeseries";
import Form from "./components/Form";
// import { useState, useEffect, useMemo } from "react";
import { useEffect } from "react";
import io from "socket.io-client";
import Logs from "./components/Logs";
import Scatter from "./components/Scatter";
import Landing from "./components/Landing";
import { useSelector, useDispatch } from "react-redux";
import { monitoring, notMonitoring } from "./redux/monitorSlice";
import { updateData } from "./redux/trafficSlice";
import { updateForAttack, updateForNormal } from "./redux/logSlice";

const serverIp = "http://localhost:3001";
const socket = io.connect(serverIp);

function App() {
    const dispatch = useDispatch();
    const monitorState = useSelector((state) => state.monitor.value);
    const lastTrafficType = useSelector((state) => state.log.lastTrafficType);

    // const [testData, setTestData] = useState(false);

    useEffect(() => {
        const fetchTrafficData = () => {
            socket.on("sent from the server", (data, cols) => {
                dispatch(updateData([data, cols]));
            });
        };

        const fetchMonitorState = () => {
            fetch("http://localhost:3001/getMonitorState", {
                method: "GET",
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data.state);
                    if (data.state) {
                        dispatch(monitoring());
                        // dispatch(updateLog(data));
                    } else {
                        dispatch(notMonitoring());
                    }
                });
        };

        const fetchTestData = () => {
            fetch("http://localhost:3001/test", {
                method: "GET",
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    if (data.attack) {
                        dispatch(updateForAttack());
                    } else {
                        dispatch(updateForNormal());
                    }
                    // setTestData(data.attack);
                });
        };

        fetchMonitorState();
        fetchTrafficData();

        const testHandle = setInterval(fetchTestData, 5000);

        return () => {
            clearInterval(testHandle);
        };
    }, [dispatch]);

    if (!monitorState) {
        return <Landing />;
    } else {
        return (
            <Router>
                <div className="container">
                    <div className="mathi_div">
                        <Sidenav />
                        <Routes>
                            <Route
                                exact
                                path="/"
                                element={
                                    <>
                                        <Traffic />
                                    </>
                                }
                            />
                            {/* <Route
                                exact
                                path="/timeseries"
                                element={
                                    <>
                                        <Traffic
                                            data={trafficData}
                                            columns={columns}
                                        />
                                        <Timeseries
                                            data={trafficData}
                                            columns={columns}
                                        />
                                    </>
                                }
                            /> */}
                            <Route exact path="/form" element={<Form />} />
                            <Route exact path="/logs" element={<Logs />} />
                            <Route
                                exact
                                path="/scatter"
                                element={<Scatter />}
                            />
                        </Routes>
                    </div>
                    <div className="tala_div" id="alert">
                        <Alert testData={lastTrafficType} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
