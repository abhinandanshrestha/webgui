import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateLog } from "../redux/logSlice";
import { updateScrollPosition } from "../redux/scrollSlice";

export default function Logs() {
    const logs = useSelector((state) => state.log.data);
    const { attack } = useSelector((state) => state.log);
    const containerRef = useRef(null);
    const scrollPosition = useSelector(
        (state) => state.scroll.scrollPositions.log
    );
    const storedScrollPosition = useRef(scrollPosition);
    const dispatch = useDispatch();

    useEffect(() => {
        const container = containerRef.current;

        const handleScroll = (event) => {
            const scrollTop = event.target.scrollTop;
            dispatch(updateScrollPosition(["log", scrollTop]));
        };

        if (container) {
            container.scrollTop = storedScrollPosition.current;
            container.addEventListener("scroll", handleScroll);
        }
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
            if (container) {
                container.removeEventListener("scroll", handleScroll);
            }
        };
    }, [dispatch, logs.length]);

    const logEntries = logs.map((l, index) => (
        <tr
            className={parseInt(l.split(",")[1]) !== 11 ? attack : "benign"}
            key={index}
        >
            <td>{index}</td>
            <td>{l.split(",")[0]}</td>
            <td>{l.split(",")[1]}</td>
            <td>{l.split(",")[2]}</td>
        </tr>
    ));

    return logs.length ? (
        <div className="logs" ref={containerRef}>
            <div className="titleHolder">
                <h1>Logs</h1>
            </div>
            {/* <button onClick={fetchLogData}>Refresh</button> */}
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
        <div className="loading">
            <h1>Fetching Logs</h1>
        </div>
    );
}
