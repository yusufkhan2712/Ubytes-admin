import { TextField } from "material-ui";

import React, { Component } from "react";
import Select from "react-select";
import db, { storage } from "../firebase";
import { imageToBase64 } from "../utils";

export default class Combo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
      ],
      branch: [{}],
      productName: "",
      productDescription: "",
      productPrice: 0,
      singleTag: "",
      additionalItems: [{ name: "", quantity: 0, price: 0 }],
    };
    this.loadMerchant = this.loadMerchant.bind(this);
    this.loadBranch = this.loadBranch.bind(this);
    this.loadMenu = this.loadMenu.bind(this);
    this.submit = this.submit.bind(this);
  }

  async loadMerchant() {
    var k = [];
    var data = await db.collection("Merchant").get();
    data.forEach((el) => {
      var _ = el.data();
      _["value"] = el.id;
      _["label"] = el.data().brandName;
      k.push(_);
    });

    this.setState({ options: k });
  }
  async loadBranch(value) {
    var k = [];

    var data = await db
      .collection("Branches")
      .where("merchantId", "==", value.value)
      .get();
    data.forEach((el) => {
      var _ = el.data();
      _["value"] = el.id;
      _["label"] = el.data().branchName;
      k.push(_);
    });

    this.setState({ branch: k });
  }

  async componentDidMount() {
    if (this.props.match.params.id) {
      var data = await db
        .collection("comboItems")
        .doc(this.props.match.params.id)
        .get();
      this.setState(data.data());
    }
    this.loadMerchant();
  }
  async loadMenu(value) {
    var k = [];

    var data = await db
      .collection("Products")
      .where("branchId", "==", value.value)
      .get();
    data.forEach((el) => {
      var _ = el.data();
      _["value"] = el.id;
      _["label"] = el.data().productName;
      k.push(_);
    });

    this.setState({ menu: k });
  }

  async submit() {
    //
    if (this.props.match.params.id) {
      var id = this.props.match.params.id;
      console.log(id);
      await db.collection("comboItems").doc(id).update({
        comboName: this.state.comboName,
        merchant: this.state.merchant,
        branch: this.state.branch,
        comboItems: this.state.comboItems,
        productPrice: this.state.productPrice,
        productDescription: this.state.productDescription,
      });
    } else {
      await db
        .collection("comboItems")
        .add({
          comboName: this.state.comboName,
          merchant: this.state.merchant,
          branch: this.state.branch,
          comboItems: this.state.comboItems,
          productPrice: this.state.productPrice,
          productDescription: this.state.productDescription,
        })
        .then(async (k) => {
          const ref = storage.ref("comboImage/" + this.props.match.params.id);
          const url = await ref.put(this.state.productImage);
          const image = await url.ref.getDownloadURL();
          await db
            .collection("comboItems")
            .doc(k.id)
            .update({ productImage: image });
        });
    }
    //db.collection('resData').doc('3U2YUz3s95EhAJVtkFzv').collection('products').add(this.state)
  }
  onChangeCover = async (e) => {
    if (e.target.files?.length > 0) {
      const file = e.target.files[0];
      const size = file.size / 1024 / 1024;
      if (size <= 1) {
        const cover = await imageToBase64(file);
        this.setState({
          productImage: file,
          productImagePreview: cover,
          coverImageError: false,
        });
      } else {
        this.setState({ coverImageError: true });
      }
    }
  };
  render() {
    const { coverImageError, productImagePreview } = this.state;
    return (
      <div className="add_menu_item">
        <h3>Add Combo</h3>
        <div className="add_menu_item_form">
          <div className="add_form_control">
            <label htmlFor="pName">Combo Name</label>
            <input
              type="text"
              id="pName"
              onChange={(e) => this.setState({ comboName: e.target.value })}
              value={this.state.comboName}
            />
          </div>
          <div className="add_form_control-select">
            <label htmlFor="pDesc">Merchant</label>
            <Select
              options={this.state.options}
              value={this.state.merchant}
              onChange={(e) => {
                this.setState({ merchant: e });
                this.loadBranch(e);
              }}
              className="basic-multi-select"
              classNamePrefix="select"
            ></Select>
          </div>
          <div className="add_form_control-select">
            <label htmlFor="pDesc">Branch</label>
            <Select
              options={this.state.branch}
              value={this.state.branch}
              onChange={(e) => {
                this.setState({ branch: e });
                this.loadMenu(e);
              }}
              className="basic-multi-select"
              classNamePrefix="select"
            ></Select>
          </div>
          <div className="add_form_control-select">
            <label htmlFor="pDesc">Combo Items</label>
            <Select
              options={this.state.menu}
             
              value={this.state.comboItems}
              onChange={(e) => this.setState({ comboItems: e })}
              isMulti
              className="basic-multi-select"
              classNamePrefix="select"
            ></Select>
          </div>
          <div className="add_form_control">
            <div className="cover__image">
              <p>Combo image</p>
              <div className="cover_image_control">
                <label
                  className="coverImage"
                  htmlFor="productImage"
                  style={
                    productImagePreview
                      ? { backgroundImage: `url(${productImagePreview})` }
                      : {}
                  }
                >
                  {!productImagePreview && (
                    <p>
                      Drag and drop cover image or <br /> browse to upload
                    </p>
                  )}
                </label>
                <span style={coverImageError ? { color: "red" } : {}}>
                  Max of 1 MB, at least 450x250 pixels and only JPEG and PNG are
                  Allowed
                </span>
                <input
                  onChange={(e) => this.onChangeCover(e)}
                  className="productImageInput"
                  name="productImage"
                  id="productImage"
                  type="file"
                />
              </div>
            </div>
          </div>
          <div className="add_form_control">
            <label htmlFor="pDesc">Combo Description</label>
            <textarea
              type="text"
              id="pDesc"
              onChange={(e) =>
                this.setState({ productDescription: e.target.value })
              }
              value={this.state.productDescription}
            />
          </div>
          <div className="add_form_control">
            <label htmlFor="pPrice">Combo Price</label>
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
