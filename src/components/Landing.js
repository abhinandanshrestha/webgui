import { monitoring } from "../redux/monitorSlice";
import { useDispatch } from "react-redux";

export default function Landing() {
    const dispatch = useDispatch();

    const startMonitoring = () => {
        fetch("http://localhost:3001/startMonitoring", {
            method: "POST",
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data.state);
                if (data.state) {
                    dispatch(monitoring());
                }
            });
    };

    return (
        <div className="landing">
            <button onClick={startMonitoring}>Start Monitoring</button>
        </div>
    );
}
