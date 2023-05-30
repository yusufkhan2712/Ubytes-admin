import { DataGrid } from "@material-ui/data-grid";
import React from "react";
import Header from "../components/header";
const columns = [
  { field: 'id', headerName: 'S.NO', width: 160 },
  { field: 'UserName', headerName: 'User Name', width: 160 },
  { field: 'email', headerName: 'Email', width: 130 },
  { field: 'phone', headerName: 'Phone Number', width: 130 },
  { field: 'totalOrders', headerName: 'Total Orders', width: 130 },

 
];

const rows = [
  { id:0,phone:'+9193423424',totalOrders:'234',UserName:'Shfayat Ali',email:'you7844@gmail.com' },
  { id:1,phone:'+9194425454',totalOrders:'12',UserName:'Ram',email:'Ram@gmail.com' },
  { id:2,phone:'+9192423444',totalOrders:'1',UserName:'Ahmed',email:'ubytes@gmail.com' },
  { id:3,phone:'+9197823924',totalOrders:'22',UserName:'Hussain',email:'sh344@gmail.com' },
  
  
 
];
function CustomerList() {
  return (
    <>
      <Header page="Customer List"></Header>
      <div className="customerlist-body">
        <div className="headers" style={{ paddingLeft: "10px" }}>
          <p>Order History</p>
        </div>
        <div className="customer-search-bar">
          <div className="customer-search-block">
            <h5 style={{ fontWeight: "bold" }}>Name</h5>
            <input className="customer-search-input"></input>
          </div>
          <div className="customer-search-block">
            <h5 style={{ fontWeight: "bold" }}>Email</h5>
            <input className="customer-search-input"></input>
          </div>
          <div className="customer-search-block">
            <h5 style={{ fontWeight: "bold" }}>Phone</h5>
            <input className="customer-search-input"></input>
          </div>
          <button className="search-button-customer-search">Search</button>
        </div>
        <div style={{height:'500px'}}>
        <DataGrid rows={rows} columns={columns} pageSize={6}></DataGrid>
      </div>
      </div>

    </>
  );
}

export default CustomerList;
