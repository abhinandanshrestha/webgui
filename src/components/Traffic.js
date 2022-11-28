import React from "react";
import MaterialTable from "material-react-table";

export default function Traffic({ data, columns }) {
    return (
        <div className="traffic">
            {data && (
                <MaterialTable
                    columns={columns}
                    data={data}
                    enablePagination={false}
                    enableStickyHeader
                />
            )}
        </div>
    );
}
