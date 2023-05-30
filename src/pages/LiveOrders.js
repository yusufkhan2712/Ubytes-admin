import React, { Component } from "react";
import { Badge, Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import Select from "react-select";

import Header from "../components/header";
import db from "../firebase";

class LiveOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preparationTime: 0,
      deliveryTime: 0,
      modalState: false,
      category: "all",
      orderSelected: { products: [] },
      orders: [],
      refreshClicked: false,
      order: [],
      merchants: [],
      branches: [],
      merchant: "",
      branch: "",
    };
    this.reject = this.reject.bind(this);
    this.categorizeData = this.categorizeData.bind(this);
    this.getOrders = this.getOrders.bind(this);
    this.loadWaiters = this.loadWaiters.bind(this);
    this.timings = this.timings.bind(this);
  }

  async getOrders() {
    setTimeout(async () => {
      try {
        let data = await db
          .collection("orders")
          .where("branchId", "==", this?.state?.branch?.value)
          .get();
        let orders = [];
        data.forEach((e) => {
          orders.push({
            ...e.data(),
            id: e.id,
          });
        });
        console.log(orders);
        this.setState({
          orders: orders,
        });
        this.categorizeData();
      } catch (e) {
        console.log(e);
      }
    }, 2000);
  }
  async getMerchants() {
    let merchants = await db.collection("Merchant").get();
    let merchants_ = [];
    merchants.docs.forEach((merchant) =>
      merchants_.push({
        value: merchant.id,
        label: merchant.data().brandName,
      })
    );

    this.setState({
      merchants: merchants_,
    });
  }
  async getBranches(id) {
    let branches = await db
      .collection("Branches")
      .where("merchantId", "==", id)
      .get();
    let branches_ = [];
    branches.docs.forEach((branch) =>
      branches_.push({
        value: branch.id,
        label: branch.data().branchName,
      })
    );
    this.setState({
      branches: branches_,
    });
  }

  async categorizeData() {
    var data = this.state.orders;

    var all = 0;
    var new_ = 0;
    var rejected = 0;
    data.forEach((k) => {
      all += 1;
      if (k.preparationTime == undefined || k.rejected == undefined) {
        new_ += 1;
      } else if (k.rejected) {
        rejected += 1;
      }
    });
    this.setState({ all: all, new: new_, rejected: rejected });
  }
  async loadWaiters() {
    var data = await db.collection("waiters").get();
    var waiters_ = [];
    data.forEach((k) => {
      var _ = k.data();
      _["value"] = k.data().waiterName;
      _["label"] = k.data().waiterName;

      waiters_.push(_);
    });
    this.setState({ waiter: waiters_ });
  }

  async updateWaiter() {
    var selectedWaiter = this.state.selectedWaiter;
    //console.log(selectedWaiter)
    await db
      .collection("orders")
      .doc(this.state.orderSelected.id)
      .update({ acceptedBy: selectedWaiter || "" });
  }

  async reject(e) {
    await db.collection("orders").doc(e).update({ rejected: true });
    this.setState({ orderSelected: "", detailed: false });
  }
  async acceptOrder(e) {
    await db.collection("orders").doc(e).update({
      accepted: true,
    });
    this.setState({ orderSelected: "", detailed: false });
    this.setState({ modalState: false });
  }
  async timings() {
    await db.collection("orders").doc(this.state.orderSelected.id).update({
      preparationTime: this.state.preparationTime,
      deliveryTime: this.state.deliveryTime,
      active: false,
    });
    this.setState({
      modalState: false,
      orderSelected: "",
      selectedWaiter: "",
      preparationTime: "",
      deliveryTime: "",
    });

    alert("Live order accepted");
  }
  componentDidMount() {
    /*  this.getOrders(); */
    this.loadWaiters();
    this.getMerchants();
  }
  refresh = () => {
    this.setState({ refreshClicked: !this.state.refreshClicked });
  };

  render() {
    var topBar = (
      <div className="live-orders-top">
        <div
          onClick={() => this.setState({ category: "new" })}
          className={
            this.state.category == "new"
              ? "live-top-section-active"
              : "live-top-section"
          }
        >
          <p className="live-temp">New </p>{" "}
          <Badge
            variant={this.state.category == "new" ? "danger" : "secondary"}
          >
            {this.state.new}
          </Badge>
        </div>
        <div
          onClick={() => this.setState({ category: "all" })}
          className={
            this.state.category == "all"
              ? "live-top-section-active"
              : "live-top-section"
          }
        >
          <p className="live-temp">Today's Orders </p>{" "}
          <Badge
            variant={this.state.category == "all" ? "primary" : "secondary"}
          >
            {this.state.all}
          </Badge>
        </div>
        <div
          onClick={() => this.setState({ category: "in-kitchen" })}
          className={
            this.state.category == "in-kitchen"
              ? "live-top-section-active"
              : "live-top-section"
          }
        >
          <p className="live-temp">Rejected </p>{" "}
          <Badge
            variant={
              this.state.category == "in-kitchen" ? "warning" : "secondary"
            }
          >
            {this.state.rejected}
          </Badge>
        </div>
      </div>
    );

    return (
      <>
        <div style={{ width: "100%", overflow: "hidden" }}>
          <Header liveorders={true} element={topBar}></Header>
          <div
            style={{
              padding: 20,
              display: "flex",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Select
              containerStyle={{
                width:"100%"
              }}
              options={this.state.merchants}
              placeholder="Select Merchant"
              value={this.state.merchant}
              onChange={(e) => {
                this.setState({
                  merchant: e,
                });
                this.getBranches(e.value);
              }}
            />
            <span
              style={{
                margin: 10,
              }}
            ></span>
            <Select
              options={this.state.branches}
              placeholder="Select Branch"
              value={this.state.branch}
              onChange={(e) => {
                this.setState({
                  branch: e,
                });
                this.getOrders();
              }}
            />
          </div>
          <div className="live-order-body">
            <div
              className={
                this.state.orders.length == 0
                  ? "live-order-container"
                  : "live-order-container-filled"
              }
            >
              <div className="live-search-bar">
                <input
                  className="live-search-bar-input"
                  placeholder="Search by order id..."
                ></input>{" "}
                <i class="fas fa-search"></i>
              </div>
              {this.state.orders.map((data) => (
                <div
                  onClick={() =>
                    this.setState({ orderSelected: data, detailed: true })
                  }
                  className="live-single-order"
                  style={{
                    backgroundColor:
                      data.type == "dine-in"
                        ? "rgb(243, 49, 49);"
                        : data.type == "pick-up"
                        ? "green"
                        : data.type == "delivery"
                        ? "blue"
                        : "red",
                  }}
                >
                  <p style={{ fontWeight: "bolder" }}>{data.id}</p>
                  <p style={{ fontWeight: "bold", fontSize: "small" }}>
                    {data.branchName},
                    {new Date(data?.at?.toDate()).toDateString()}{" "}
                  </p>
                </div>
              ))}
              {this.state.orders.length == 0 ? (
                <div className="live-no-order">
                  <i class="fas fa-utensils"></i>
                  <p className="live-no-order-text">
                    There is no pending order
                  </p>
                </div>
              ) : null}
            </div>
            {this.state.detailed ? (
              <div className="live-order-selected">
                {this.state.orderSelected.id != "" ? (
                  <>
                    {" "}
                    <div className="live-order-selected-top">
                      <p>{this.state.orderSelected.id}</p>
                      <p>{this.state.orderSelected.time}</p>
                      <button className="live-order-selected-top-button">
                        New
                      </button>
                    </div>
                    <div className="live-order-selected-row">
                      <a className="live-order-help">Help</a>
                      <a className="live-order-help">Print</a>
                    </div>
                    <div className="live-order-selected-col">
                      <div className="live-order-selected-left">
                        <h6 style={{ fontSize: "0.7rem", color: "grey" }}>
                          Brand
                        </h6>
                        <p>{this.state.orderSelected.merchantName}</p>
                      </div>
                      <div className="live-order-selected-left">
                        <h6 style={{ fontSize: "0.7rem", color: "grey" }}>
                          Outlet
                        </h6>
                        <p>{this.state.orderSelected.branchName}</p>
                      </div>
                    </div>
                    <div className="live-order-selected-col">
                      <div className="live-order-selected-left">
                        <h6 style={{ fontSize: "0.7rem", color: "grey" }}>
                          Order Type
                        </h6>
                        <p>{this.state.orderSelected.type}</p>
                      </div>
                      <div className="live-order-selected-left">
                        <h6 style={{ fontSize: "0.7rem", color: "grey" }}>
                          Delivery At
                        </h6>
                        <p>{this.state.orderSelected.deliveryAt}</p>
                      </div>
                    </div>
                    <div className="live-order-selected-col">
                      <div className="live-order-selected-left">
                        <h6 style={{ fontSize: "0.7rem", color: "grey" }}>
                          Customer
                        </h6>
                        <p>{this.state.orderSelected.customer}</p>
                      </div>
                      <div className="live-order-selected-left">
                        <h6 style={{ fontSize: "0.7rem", color: "grey" }}>
                          Phone Number
                        </h6>
                        <p>{this.state.orderSelected.userPhone}</p>
                      </div>
                    </div>
                    <div className="live-order-selected-col">
                      <div className="live-order-selected-left">
                        <h6 style={{ fontSize: "0.7rem", color: "grey" }}>
                          Payment
                        </h6>
                        <p>{this.state.orderSelected.payment}</p>
                      </div>
                      <div className="live-order-selected-left">
                        <h6 style={{ fontSize: "0.7rem", color: "grey" }}>
                          Channel
                        </h6>
                        <p>{this.state.orderSelected.channel}</p>
                      </div>
                    </div>
                    <div className="live-order-selected-col">
                      <div className="live-order-selected-left">
                        <h6 style={{ fontSize: "0.7rem", color: "grey" }}>
                          Deliver to
                        </h6>
                        <p>{this.state.orderSelected.deliverTo}</p>
                      </div>
                      {this.state.orderSelected.type == "dine-in" ? (
                        <div className="live-order-selected-left">
                          <h6 style={{ fontSize: "0.7rem", color: "grey" }}>
                            Waiter
                          </h6>
                          <Select
                            options={this.state.waiter}
                            onChange={(e) =>
                              this.setState({ selectedWaiter: e })
                            }
                          ></Select>
                        </div>
                      ) : null}
                    </div>
                    <div className="live-order-selected-col">
                      <div
                        className="live-order-selected-left"
                        style={{ padding: "2%" }}
                      >
                        {this.state?.orderSelected?.products?.length > 0
                          ? this.state?.orderSelected?.products?.productData?.map(
                              (items) => (
                                <>
                                  <h6 style={{ fontSize: "0.8rem" }}>
                                    {items.quantity}x {items.productName}
                                  </h6>
                                  <h6
                                    style={{
                                      fontSize: "0.7rem",
                                      color: "grey",
                                      marginLeft: "2rem",
                                    }}
                                  >
                                    Side Options:
                                  </h6>
                                  {items.additionalItems
                                    ? items.additionalItems.map((side) => {
                                        return side.subquantity ? (
                                          <h6
                                            style={{
                                              fontSize: "0.7rem",
                                              marginLeft: "2rem",
                                            }}
                                          >
                                            {side.subquantity}x {side.name}
                                          </h6>
                                        ) : null;
                                      })
                                    : null}
                                </>
                              )
                            )
                          : null}
                      </div>
                      <div
                        className="live-order-selected-left"
                        style={{ padding: "2%", alignItems: "flex-end" }}
                      >
                        <h6 style={{ fontSize: "0.8rem" }}>47.3</h6>
                      </div>
                    </div>
                    <div className="live-order-selected-col">
                      <div
                        className="live-order-selected-left"
                        style={{ padding: "2%" }}
                      ></div>
                      <div
                        className="live-order-selected-left"
                        style={{ padding: "2%", alignItems: "flex-end" }}
                      >
                        <h6 style={{ fontSize: "1rem" }}>
                          Subtotal:{" "}
                          <span style={{ marginLeft: "6rem" }}>47.5</span>
                        </h6>
                        <h6 style={{ fontSize: "1rem" }}>
                          VAT (5%):{" "}
                          <span style={{ marginLeft: "6rem" }}>23</span>
                        </h6>
                        <h6 style={{ fontSize: "1rem" }}>
                          Delivery Fee:{" "}
                          <span style={{ marginLeft: "6rem" }}>20</span>
                        </h6>
                        <h6 style={{ fontSize: "1.2rem" }}>
                          Total:{" "}
                          <span style={{ marginLeft: "4rem", color: "blue" }}>
                            INR {this.state.orderSelected.totalPrice}
                          </span>
                        </h6>
                      </div>
                    </div>
                    <div className="live-selected-bottom">
                      <button
                        onClick={() => {
                          this.setState({ modalState: true });
                          this.updateWaiter();
                        }}
                      >
                        Accept
                      </button>
                      <button
                        style={{
                          color: "black",
                          backgroundColor: "whitesmoke",
                        }}
                        onClick={() => this.reject(this.state.orderSelected.id)}
                      >
                        Reject
                      </button>
                    </div>
                  </>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
        <Modal show={this.state.modalState}>
          <Modal.Header>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <h5 style={{ fontWeight: "bold" }}>Accept Order</h5>
              <h5 style={{ fontWeight: "bold" }}>
                {this.state.orderSelected.id}
              </h5>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <p style={{ alignSelf: "center" }}>Prep Time</p>
              <div className="live-accept-timer">
                <button
                  onClick={() =>
                    this.setState({
                      preparationTime: this.state.preparationTime + 1,
                    })
                  }
                >
                  +
                </button>
                <input
                  value={this.state.preparationTime}
                  className="live-accept-timer-input"
                ></input>
                <button
                  onClick={() =>
                    this.setState({
                      preparationTime: this.state.preparationTime - 1,
                    })
                  }
                >
                  -
                </button>
              </div>
              <p style={{ alignSelf: "center", fontSize: "small" }}>Minutes</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <p style={{ alignSelf: "center" }}>Delivery Time</p>
              <div className="live-accept-timer">
                <button
                  onClick={() =>
                    this.setState({ deliveryTime: this.state.deliveryTime + 1 })
                  }
                >
                  +
                </button>
                <input
                  value={this.state.deliveryTime}
                  className="live-accept-timer-input"
                ></input>
                <button
                  onClick={() =>
                    this.setState({ deliveryTime: this.state.deliveryTime - 1 })
                  }
                >
                  -
                </button>
              </div>

              <p style={{ fontSize: "small" }}>Minutes</p>
            </div>
          </Modal.Body>

          <div className="modal-footert">
            <button onClick={() => this.setState({ modalState: false })}>
              Close
            </button>
            <button
              style={{ backgroundColor: "#008bcc", color: "white" }}
              onClick={() => this.timings()}
            >
              Accept
            </button>
          </div>
        </Modal>
      </>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user.user,
    mid: state.user.mid,
    bid: state.user.bid,
  };
};

export default connect(mapState)(LiveOrders);
