import React from "react";
// import MaterialTable from "material-react-table";
import { useSelector } from "react-redux";

export default function Traffic() {
    const trafficData = useSelector((state) => state.traffic.data);
    const trafficCols = useSelector((state) => state.traffic.cols);
    const tableRows = trafficData.map((rowData, index) => (
        <tr key={index}>
            {rowData.map((data, i) => (
                <td key={i}>{data}</td>
            ))}
        </tr>
    ));
    const tableHead = trafficCols.map((col, index) => (
        <th key={index}>{col}</th>
    ));

    return (
        <div className="traffic">
            {/* {
                trafficData && trafficData
                // <MaterialTable
                //     columns={trafficCols}
                //     data={trafficData}
                //     enablePagination={false}
                //     enableStickyHeader
                // />
            } */}
            <table>
                <thead>
                    <tr>{tableHead}</tr>
                </thead>
                <tbody>{tableRows}</tbody>
            </table>
        </div>
    );
}
