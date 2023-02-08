import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateLog } from "../redux/logSlice";
const moment = require("moment");

export default function Logs() {
    const logs = useSelector((state) => state.log.data);
    const { attack } = useSelector((state)=>state.log);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchLogData = () => {
            const url = `http://localhost:3001/getLogData?logCount=${encodeURIComponent(
                logs.length
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

        const logHandle = setInterval(fetchLogData, 5000);

        return () => {
            clearInterval(logHandle);
        };
    }, [dispatch, logs.length]);

    // const attack='attack';

    const logEntries = logs.map((l, index) => (
        
        <tr className={l.split(",")[1] !=11 ? attack : 'benign'} key={index}>
            <td>{index}</td>
            <td>{moment(parseInt(l.split(",")[0])).format("LLLL")}</td>
            <td>{l.split(",")[1]}</td>
            <td>{l.split(",")[2]}</td>
        </tr>
    ));

    return logs.length ? (
        <div className="logs">
            <h3>Logs</h3>
            {/* <button onClick={fetchLogData}>Refresh</button> */}
            <br />
            <table>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Timestamp</th>
                        <th>Attack Category</th>
                        <th>Attack Type</th>
                    </tr>
                </thead>
                <tbody>{logEntries}</tbody>
            </table>
        </div>
    ) : (
        <div className="logs">
            <h1>Fetching Logs</h1>
        </div>
    );
}
