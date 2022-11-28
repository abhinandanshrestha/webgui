import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

function StackedAreaChart({ data, columns }) {
    return (
        <div className="charts">
            <center>
                <h3>Idle Plot</h3>
            </center>
            <div className="plots">
                <AreaChart
                    width={850}
                    height={700}
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 40,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="a" />
                    <YAxis />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="b"
                        stackId="1"
                        stroke="#8884d8"
                        fill="#8884d8"
                    />
                    <Area
                        type="monotone"
                        dataKey="c"
                        stackId="1"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                    />
                    <Area
                        type="monotone"
                        dataKey="d"
                        stackId="1"
                        stroke="#ffc658"
                        fill="#ffc658"
                    />
                </AreaChart>
            </div>
        </div>
    );
}

export default StackedAreaChart;
