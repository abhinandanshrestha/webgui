import React, { useState, useEffect } from "react";
import { useMemo } from "react";
import MaterialTable from "material-react-table";
import io from 'socket.io-client';
const serverIp="http://localhost:3001";
const socket=io.connect(serverIp);

export default function Traffic() {
    const [data, setData] = useState([]);
    const [cols, setCols] = useState([]);
    const columns = useMemo(() => cols, [cols]);

    const fetchData = () => {
        socket.on("sent from the server",(data,columns)=>{
            setData(data);
            setCols(columns);
          })
    };

    useEffect(() => {
        fetchData();
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
