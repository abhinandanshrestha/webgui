import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { monitoring, notMonitoring } from "./redux/monitorSlice";
import { updateForAttack, updateForNormal, appendLog } from "./redux/logSlice";

import Traffic from "./components/Traffic";
import Sidenav from "./components/Sidenav";
import Alert from "./components/Alert";
import Logs from "./components/Logs";
import Scatter from "./components/Scatter";
import Landing from "./components/Landing";
import Bar from "./components/Bar";
import Form from "./components/Form";

function App() {
    const dispatch = useDispatch();
    const monitorState = useSelector((state) => state.monitor.value);
    const lastTrafficType = useSelector((state) => state.log.lastTrafficType);

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
                        dispatch(
                            appendLog([`${data.timestamp}, ${data.attackType}`])
                        );
                    } else {
                        dispatch(updateForNormal());
                    }
                });
        };

        fetchMonitorState();

        const monitorHandle = setInterval(fetchMonitorState, 5000);
        const testHandle = setInterval(fetchTestData, 5000);

        return () => {
            clearInterval(testHandle);
            clearInterval(monitorHandle);
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
                            <Route exact path="/form" element={<Form />} />
                            <Route exact path="/logs" element={<Logs />} />
                            <Route
                                exact
                                path="/scatter"
                                element={<Scatter />}
                            />
                            <Route exact path="/bar" element={<Bar />} />
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
