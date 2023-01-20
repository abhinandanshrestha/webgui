import Sidenav from "./components/Sidenav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StackedAreaChart from "./components/StackedAreaChart";
import Traffic from "./components/Traffic";
import Alert from "./components/Alert";
import Timeseries from "./components/Timeseries";
import Form from "./components/Form";
import { useState, useEffect, useMemo } from "react";
import io from "socket.io-client";
import Logs from "./components/Logs";
const serverIp = "http://localhost:3001";
const socket = io.connect(serverIp);

function App() {
    const [data, setData] = useState([]);
    const [cols, setCols] = useState([]);
    const columns = useMemo(() => cols, [cols]);

    const fetchData = () => {
        socket.on("sent from the server", (data, columns) => {
            setData(data);
            setCols(columns);
        });
    };

    const [testData, setTestData] = useState(false);

    useEffect(() => {
        fetchData();
        const testHandle = setInterval(() => {
            fetch("http://localhost:3001/test", {
                method: "GET",
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    setTestData(data.attack);
                });
        }, 5000);
        return () => clearInterval(testHandle);
    }, []);

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
                                    <Traffic data={data} columns={columns} />
                                    <StackedAreaChart
                                        data={data}
                                        columns={columns}
                                    />
                                </>
                            }
                        />
                        <Route
                            exact
                            path="/timeseries"
                            element={
                                <>
                                    <Traffic data={data} columns={columns} />
                                    <Timeseries data={data} columns={columns} />
                                </>
                            }
                        />
                        <Route exact path="/form" element={<Form />} />
                        <Route exact path="/logs" element={<Logs />} />
                    </Routes>
                </div>
                <div className="tala_div" id="alert">
                    <Alert testData={testData} />
                </div>
            </div>
        </Router>
    );
}

export default App;
