import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import Header from "../components/header";
import db from "../firebase";
const columns = [
  { field: "id", headerName: "S.NO", width: 160 },
  { field: "name", headerName: "Name", width: 160 },
  { field: "email", headerName: "Email", width: 180 },
  { field: "phone", headerName: "Phone Number", width: 180 },
  { field: "branch", headerName: "Branch", width: 180 },
  { field: "merchant", headerName: "Merchant", width: 180 },
];

function CustomerList() {
  const [users, setUsers] = React.useState([]);

  const getUsers = async () => {
    const snapshot = await db.collection("clientuser").get();
    const users = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      users.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setUsers(users);
  };
  useEffect(() => {
    getUsers();
  }, []);
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
        <div style={{ height: "500px" }}>
          <DataGrid rows={users} columns={columns} pageSize={50}></DataGrid>
        </div>
      </div>
    </>
  );
}

export default CustomerList;
