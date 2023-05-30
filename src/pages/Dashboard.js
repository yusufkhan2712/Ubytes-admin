import React, { Component } from "react";
import DashboardBlock from "../components/dashboard-block";
import DashboardTable from "../components/dashboard-table";
import Header from "../components/header";
import MyChart from "../components/line-chart";
import Select from "react-select";
import db from "../firebase";
export default class Dashboard extends Component {
  state = {
    orders: [],
  };
  async getOrders() {
    let orders = await db.collection("orders").get();
    this.setState({
      orders: orders.docs.map((item) => item.data()),
    });
  }
  componentDidMount() {
    sessionStorage.setItem("usersidepage", false);
    this.getOrders();
  }
  render() {
    return (
      <div className="dashboard-body">
        <Header page="Dashboard"></Header>
        <div className="dashboard-block-row">
          <div className="dashboard-upper-row">
            <div style={{ width: "35%" }}>
              <Select className="select-input"></Select>
            </div>
            <div style={{ width: "15%" }}>
              <button className="dashboard-marketing-button">
                Launch marketing activity
              </button>
            </div>
          </div>
        </div>
        <div className="dashboard-block-row">
          <DashboardBlock
            header="Total orders"
            quantity={this.state.orders.length}
            unit="orders completed"
          ></DashboardBlock>
          <DashboardBlock
            header="Total sales"
            quantity={`INR ${this.state.orders.reduce((acc, item) => {
              return acc + item.totalPrice;
            }, 0)}`}
            unit="sales"
          ></DashboardBlock>
          <DashboardBlock
            header="Average basket value"
            quantity={`
            INR ${
              this.state.orders.reduce((acc, item) => {
                return acc + item.totalPrice;
              }, 0) / this.state.orders.length
            }`}
            unit="avaergae basket value"
          ></DashboardBlock>
          <DashboardBlock
            header="Average order rating"
            quantity="N/A"
            unit="average order rating score"
          ></DashboardBlock>
        </div>
        <div className="dashboard-block-row">
          <DashboardTable rows={this.state.orders}></DashboardTable>
          <br></br>
        </div>
        <br></br>
        {/*  <div className="dashboard-block-row-chart">
          <div>
            <div className="chartblock-head">
              <p>Total orders by source</p>
            </div>
            <div className="dashboard-chart-block">
              <MyChart></MyChart>
            </div>
          </div>
          <div>
            <div className="chartblock-head">
              <p>Total orders by source</p>
            </div>
            <div className="dashboard-chart-block">
              <MyChart></MyChart>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}
