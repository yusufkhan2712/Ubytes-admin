import React, { Component, useEffect, useState } from "react";
import Header from "../components/header";
import HistrorySearch from "../components/histrory-search";
import OrderHistoryTable from "../components/orderHistoryTable";
import db from "../firebase";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    let order = await db.collection("orders").get();
    setOrders(
      order.docs.map((order_) => {
        return { ...order_.data(), id: order_.id };
      })
    );
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className="order-history-body">
      <Header page="Order History"></Header>
      <div className="headers">
        <p>Order History</p>
      </div>
      {/* <HistrorySearch></HistrorySearch> */}
      {orders.length > 0 && <OrderHistoryTable rows={orders} />}
    </div>
  );
}
