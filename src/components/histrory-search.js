import React from "react";
import Select from "react-select";
import Header from "./header";

function HistrorySearch() {
  const options = [
    { value: "new", label: "New" },
    { value: "in-kitchen", label: "In Kitchen" },
    { value: "in-route-ready", label: "In Route/Ready" },
    { value: "deliverd", label: "Deliverd" },
    { value: "rejected", label: "Rejected" },
    { value: "cancelled", label: "Cancelled" },
  ];
  return (
    <>
      <div className="history-search">
        
        <div className="history-search-first-row">
          <div className="history-search-small-row">
            <input placeholder="ID" className="login-form-input"></input>
            <div className="seperator"></div>
            <input
              placeholder="Phone Number"
              className="login-form-input"
            ></input>
          </div>
          <div className="seperator"></div>
          <div className="history-search-big-row">
            <Select className="select-input"></Select>
            <div className="seperator"></div>
            <Select className="select-input"></Select>
          </div>
        </div>
        <div className="history-search-first-row">
          <div className="history-search-big-row">
            <Select options={options} isMulti className="select-input"></Select>
            <div className="seperator"></div>
            <Select options={options} isMulti className="select-input"></Select>
            <div className="seperator"></div>
            <Select
              isMulti
              options={[
                { value: "delivery", label: "Delivery" },
                { value: "pick-up", label: "Pick Up" },
                { value: "dine-in", label: "Dine in" },
              ]}
              className="select-input"
            ></Select>
          </div>
        </div>
        <div className="history-search-first-row">
          <div className="history-search-big-row">
            <div className="history-row-big">
              {" "}
              <Select
                options={options}
                isMulti
                className="select-input"
              ></Select>
              <div className="seperator"></div>
              <button className="search-button-history">Search</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HistrorySearch;
