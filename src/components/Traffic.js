import React, { useState, useEffect } from "react";
import { useMemo } from "react";
import MaterialReactTable from "material-react-table";

export default function Traffic() {
    const [data, setData] = useState([]);

    const fetchData = () => {
        fetch("http://localhost:5000/data")
            .then((res) => res.json())
            .then((data) => JSON.parse(data))
            .then((data) => {
                console.log(data);
                setData(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = useMemo(
        () => [
            {
                accessorKey: "a.x",
                header: "a->x",
            },
            {
                accessorKey: "a.y",
                header: "a->y",
            },
            {
                accessorKey: "b",
                header: "b",
            },
            {
                accessorKey: "c",
                header: "c",
            },
        ],
        []
    );

    return (
        <div className="traffic">
            Traffic
            {data && <MaterialReactTable columns={columns} data={data} />}
        </div>
    );
}
