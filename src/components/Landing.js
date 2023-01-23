export default function Landing({ setMonitorState }) {
    const startMonitoring = () => {
        fetch("http://localhost:3001/startMonitoring", {
            method: "POST",
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data.state);
                setMonitorState(data.state);
            });
    };

    return (
        <div className="landing">
            <button onClick={startMonitoring}>Start Monitoring</button>
        </div>
    );
}
