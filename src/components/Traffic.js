import React, { useState, useEffect } from "react";
import { useMemo } from "react";
import MaterialReactTable from "material-react-table";

export default function Traffic() {
    const [data, setData] = useState([]);
    const [cols, setCols] = useState([]);
    const columns = useMemo(() => cols, [cols]);

    const fetchData = () => {
        fetch("http://localhost:5000/data")
            .then((res) => res.json())
            .then((data) => JSON.parse(data))
            .then(({ data, columns }) => {
                setData(data);
                setCols(columns);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="traffic">
            Traffic
            {data && <MaterialReactTable columns={columns} data={data} />}
        </div>
    );
}
