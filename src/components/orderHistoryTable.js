import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@material-ui/data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "merchantId",
    headerName: "Merchant Name",
    width: 180,
    editable: true,
  },
  {
    field: "branchName",
    headerName: "Branch name",
    width: 180,
    editable: true,
  },
  {
    field: "paymentMethod",
    headerName: "Payment Method",
    width: 180,
    editable: true,
  },
  {
    field: "preparationTime",
    headerName: "Preparation Time",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 180,
  },
  {
    field: "type",
    headerName: "Type",
    width: 180,
    editable: true,
  },
  {
    field: "totalPrice",
    headerName: "Total (INR)",
    width: 180,
    editable: true,
  },
  {
    field: "active",
    headerName: "Status",
    width: 180,
    editable: true,
  },
  {
    field: "at",
    headerName: "Time",
    width: 180,
    editable: true,
    component: "time",
    valueFormatter: (params) => {
      return new Date(params.value.toDate()).toLocaleString();
    }
    
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function orderHistoryTable({ rows }) {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
