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
  async getMerchants() {
    let merchants_ = [];
    let merchants__ = await db.collection("Merchant").get();
    merchants__.docs.forEach((merchant) => {
      merchants_.push({
        label: merchant.data().brandName,
        value: merchant.id,
      });
    });
    this.setState({ merchants: merchants_ });
  }
  async getBranches(value) {
    if (value) {
      let branches_ = [];
      let branches__ = await db
        .collection("Branches")
        .where("merchantId", "==", value.value)
        .get();
      branches__.docs.forEach((branch) => {
        branches_.push({
          label: branch.data().branchName,
          value: branch.id,
        });
      });
      this.setState({ branches: branches_ });
    }
  }
  async getOrdersByBranch(value) {
    if (value) {
      let orders = await db
        .collection("orders")
        .where("branchId", "==", value.value)
        .get();
      this.setState({
        orders: orders.docs.map((item) => item.data()),
      });
    }
  }

  componentDidMount() {
    sessionStorage.setItem("usersidepage", false);
    this.getMerchants();

    /*  this.getOrders(); */
  }
  render() {
    return (
      <div className="dashboard-body">
        <Header page="Dashboard"></Header>
        <div className="dashboard-block-row">
          <div className="dashboard-upper-row">
            <div style={{ width: "100%", display: "flex" }}>
              <Select
                options={this.state.merchants}
                onChange={(value) => {
                  this.getBranches(value);
                }}
                className="select-input"
              ></Select>
              <Select
                options={this.state.branches}
                onChange={(value) => {
                  this.getOrdersByBranch(value);
                }}
                className="select-input"
              ></Select>
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
            INR ${parseInt(
              this.state.orders.reduce((acc, item) => {
                return acc + item.totalPrice;
              }, 0) / this.state.orders.length
            )}`}
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
