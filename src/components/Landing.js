import { monitoring } from "../redux/monitorSlice";
import { useDispatch } from "react-redux";
import { setCustomTesting } from "../redux/monitorSlice";
import { Link } from "react-router-dom";

export default function Landing(props) {
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
    };

    const enableCustomTesting = () => {
        dispatch(setCustomTesting(true));
    };

    return (
        <div className="landing">
            <div>
                <i>
                    <b>cicflowmeter</b>
                </i>{" "}
                is not running.
            </div>
            <button onClick={startMonitoring}>Start Monitoring</button>
            <Link to={"/form"}>
                <button onClick={enableCustomTesting}>Test Custom Data</button>
            </Link>
        </div>
    );
}
