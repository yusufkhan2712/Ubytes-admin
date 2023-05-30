import React from 'react'
import { DataGrid } from "@material-ui/data-grid";
const columns = [
    { field: '# of orders', headerName: '# of orders', width: 160 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
  
   
  ];
  
  const rows = [
    { id:0, lastName: 'Snow', firstName: 'Jon', age: 35 },
    {  id:1,lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    {  id:2,lastName: 'Lannister', firstName: 'Jaime', age: 45 },
   
  ];
function Table(props) {
    return (
        <div className="table-modified" style={{ height: 400, width: '90%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={3} />
    </div>
    )
}

export default Table
