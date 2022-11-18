import React, { useState, useEffect } from "react";
import { useMemo } from "react";
import MaterialTable from "material-react-table";

export default function Traffic() {
    const [data, setData] = useState([]);
    const [cols, setCols] = useState([]);
    const columns = useMemo(() => cols, [cols]);

    const fetchData = () => {
        fetch("http://localhost:5000/data")
            .then((res) => res.json())
            .then((data) => JSON.parse(data))
            .then(({ data, columns, fileChanged }) => {
                console.log(fileChanged);
                if (fileChanged) {
                    setData(data);
                    setCols(columns);
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    useEffect(() => {
        setInterval(fetchData, 5000);
    }, []);

    return (
        <div className="traffic">
            {data && (
                <MaterialTable
                    columns={columns}
                    data={data}
                    paging={false}
                    enableStickyHeader
                    options={{
                        paging: true,
                        pageSize: 12, // make initial page size
                        emptyRowsWhenPaging: false, // To avoid of having empty rows
                    }}
                />
            )}
        </div>
    );
}
