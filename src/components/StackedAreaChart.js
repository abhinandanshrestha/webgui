import React,{ useState, useEffect} from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';


function StackedAreaChart() {
  const [data, setData] = useState([]);


  const fetchData = () => {
      fetch("http://localhost:5000/data")
          .then((res) => res.json())
          .then((data) => JSON.parse(data))
          .then(({ data, columns }) => {
              setData(data);
              // setCols(columns);
          })
          .catch((err) => {
              console.log(err.message);
          });
  };
  useEffect(() => {
      fetchData();
  }, []);

  return (
    <div className='charts'>
      <div className="plots">
        <AreaChart
            width={10000}
            height={700}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 30,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="src_ip" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="idle_min" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="idle_max" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            <Area type="monotone" dataKey="idle_mean" stackId="1" stroke="#ffc658" fill="#ffc658" />
          </AreaChart>
      </div>
    </div>
  )
}

export default StackedAreaChart