import { TextField } from "material-ui";

import React, { Component } from "react";
import Select from "react-select";
import db from "../firebase";

export default class Discount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      productDescription: "",
      productPrice: 0,
      singleTag: "",
      additionalItems: [{ name: "", quantity: 0, price: 0 }],
    };
    this.submit = this.submit.bind(this);
  }
  async componentDidMount() {
    await this.loadMerchant();
    await this.loadBranch();
    await this.loadMenu();
  }
  async loadMerchant() {
    var k = [];
    var data = await db.collection("Merchant").get();
    data.forEach((el) => {
      var _ = el.data();
      _["value"] = el.data().brandName;
      _["label"] = el.data().brandName;
      k.push(_);
    });
    this.setState({ merchant: k });
  }
  async loadBranch() {
    try {
      var k = [];
      var data = await db.collection("Branches").get();
      data.forEach((el) => {
        var _ = el.data();
        _["value"] = el.data()[0].basicInfo.branchName;
        _["label"] = el.data()[0].basicInfo.branchName;
        k.push(_);
      });
      this.setState({ branch: k });
    } catch {
      this.setState({ branch: [{}] });
    }
  }

  async loadMenu() {
    var k = [];
    var data = await db.collection("products").get();
    data.forEach((el) => {
      var _ = el.data();
      _["value"] = el.data().productName;
      _["label"] = el.data().productName;
      k.push(_);
    });
    this.setState({ menu: k });
  }

  async submit() {
    await db.collection("discount").add({
      discountOn: this.state.discountOn,
      merchant: this.state.selectedMerchant,
      branch: this.state.selectedBranch,
      discountItems: this.state.discountItems,
      price: this.state.productPrice,
    });
  }

  render() {
    return (
      <div className="add_menu_item">
        <h3>Add Discount</h3>
        <div className="add_menu_item_form">
          <div className="add_form_control-select">
            <label htmlFor="pName">Discount On</label>
            <Select
              options={[
                { value: "menu", label: "Menu" },
                { value: "combo", label: "Combo" },
                { value: "category", label: "Category" },
              ]}
              onChange={(e) => this.setState({ discountOn: e })}
              isMulti
              className="basic-multi-select"
              classNamePrefix="select"
            ></Select>
          </div>
          <div className="add_form_control-select">
            <label htmlFor="pDesc">Merchant</label>
            <Select
              options={this.state.merchant}
              isMulti
              className="basic-multi-select"
              onChange={(e) => this.setState({ selectedMerchant: e })}
              classNamePrefix="select"
            ></Select>
          </div>
          <div className="add_form_control-select">
            <label htmlFor="pDesc">Branch</label>
            <Select
              options={this.state.branch}
              onChange={(e) => this.setState({ selectedBranch: e })}
              isMulti
              className="basic-multi-select"
              classNamePrefix="select"
            ></Select>
          </div>
          <div className="add_form_control-select">
            <label htmlFor="pDesc">Discount Item</label>
            <Select
              options={this.state.menu}
              onChange={(e) => this.setState({ discountItems: e })}
              isMulti
              className="basic-multi-select"
              classNamePrefix="select"
            ></Select>
          </div>

          <div className="add_form_control">
            <label htmlFor="pPrice">Discount</label>
            <input
              type="number"
              id="pPrice"
              onChange={(e) => this.setState({ productPrice: e.target.value })}
              value={this.state.productPrice}
            />
          </div>

          <button onClick={this.submit}>Save</button>
        </div>
      </div>
    );
  }
}
