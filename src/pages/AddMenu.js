import Select from "react-select";
import React, { Component } from "react";
import Spinner from "../components/spinner";
import { imageToBase64 } from "../utils";
import db, { storage } from "../firebase";
import { connect } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";

class AddMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBranch: [],
      loadedGroups: [{}],
      loadedBranch: [],
      tags: [],
      productName: "",
      productDescription: "",
      productPrice: 0,
      singleTag: "",
      additionalItems: [{ name: "", quantity: 0, price: 0 }],
      loading: true,
      bId: "",
      pId: "",
      isDisable: false,
      currentBranch: "",
    };
  }

  async componentDidMount() {
    await this.loadGroups();
    await this.loadBranch();

    if (this.props.match.params.id) {
      const par = [];
      const params = new URLSearchParams(window.location.search);
      for (const param of params) {
        par.push({ name: param[0], value: param[1] });
      }
      this.setState({ bId: this.props.bid ? this.props.bid : par[0].value });
      this.setState({ pId: par[1].value });
      this.setState({ isDisable: true });
      this.getCurrentBranch();
      await this.loadData();
    }
    this.setState({ loading: false });
  }

  async getCurrentBranch() {
    var data = await db

      .collection("Branches")
      .doc(this.props.bid ? this.props.bid : this.state.bId)
      .get();
    this.setState({ currentBranch: data.data().branchName });
  }

  async loadData() {
    var data = await db.collection("Products").doc(this.state.pId).get();

    this.setState({
      ...data.data(),
      selectedMerchant: this.props.user.displayName,
      productImagePreview: data.data().productImage,
    });
  }

  addInput = () => {
    var k = this.state.additionalItems;
    k.push({ name: "", price: 0, quantity: 0 });
    this.setState({ additionalItems: k });
  };

  handleChange(i, event, name) {
    let values = [...this.state.additionalItems];
    if (name == "name") {
      values[i]["name"] = event.target.value;
    } else if (name == "quantity") {
      values[i]["quantity"] = event.target.value;
    } else {
      values[i]["price"] = event.target.value;
    }
    this.setState({ additionalItems: values });
  }

  tagHandler = (e) => {
    e.preventDefault();
    var item = this.state.tags;
    item.push(this.state.singleTag);
    this.setState({ tags: item });
    this.setState({ singleTag: "" });
    //this.pre
  };

  loadGroups = async () => {
    var data = [];
    var d = await db.collection("Merchant").orderBy("brandName").get();
    d.forEach((element) => {
      var k = element.data();
      k["label"] = element.data().brandName;
      k["value"] = element.data().id;
      data.push(k);
    });
    this.setState({ loadedGroups: data });
  };

  loadBranch = async () => {
    if (this.props.role === "Branch") {
      this.getCurrentBranch();
    } else {
      var data = [];
      var d = await db.collection("Branches").get();
      d.forEach((element) => {
        var k = element.data();
        k["label"] = element?.data()?.branchName;
        k["value"] = element?.data()?.branchName;
        k.id = element?.id;
        data.push(k);
        console.log(data);
      });
      this.setState({ loadedBranch: data });
    }
  };

  submit = async () => {
    this.setState({ loading: true });
    if (!this.props.match.params.id) {
     
      this.state.selectedBranch.map(async (branch) => {
        let merchantId = await db.collection("Branches").doc(branch.id).get();
        merchantId = merchantId.data().merchantId;
        db.collection("Products")
          .add({
            productName: this.state.productName,
            productPrice: this.state.productPrice,
            productDescription: this.state.productDescription,
            tags: this.state.tags,
            additionalItems: this.state.additionalItems,
            branchId: this.props.bid ? this.props.bid : branch.id,
            merchantId: merchantId,
          })
          .then(async (k) => {
            const ref = storage.ref("productImage/" + k.id);
            const url = await ref.put(this.state.productImage);
            const image = await url.ref.getDownloadURL();
            const branchId =
              this.state.selectedBranch[0]?.branchId ||
              this.state.selectedBranch[0]?.id ||
              "";
            k.update({
              productImage: image,
              productId: k.id,
              branchId: branchId,
            });
            this.setState({
              selectedMerchant: [{}],
              selectedBranch: [{}],
              loadedGroups: [{}],
              loadedBranch: [{}],
              tags: [],
              productName: "",
              productDescription: "",
              productPrice: 0,
              singleTag: "",
              additionalItems: [{ name: "", quantity: 0, price: 0 }],
              loading: false,
            });
          });
        alert("Product Added");
      });
    } else {
      db.collection("Products")
        .doc(this.state.pId)
        .update({
          productName: this.state.productName,
          productPrice: this.state.productPrice,
          productDescription: this.state.productDescription,
          tags: this.state.tags,
          merchantName: this.state.selectedMerchant,
          branchName: this.state.selectedBranch,
          additionalItems: this.state.additionalItems,
        })
        .then(async (k) => {
          if (this.state.productImagePreview !== this.state.productImage) {
            const ref = storage.ref(
              "productImage/" + this.props.match.params.id
            );
            const url = await ref.put(this.state.productImage);
            const image = await url.ref.getDownloadURL();
            await db
              .collection("Products")
              .doc(this.state.pId)
              .update({ productImage: image });
          }
          this.setState({
            selectedMerchant: [{}],
            selectedBranch: [{}],
            loadedGroups: [{}],
            loadedBranch: [{}],
            tags: [],
            productName: "",
            productDescription: "",
            productPrice: 0,
            singleTag: "",
            additionalItems: [{ name: "", quantity: 0, price: 0 }],
            loading: false,
            productImagePreview: null,
            productImage: null,
          });
          this.props.history.push("/view/menu");
        });
    }
  };

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

  onSelectBranch = (slc) => {
    if (slc.length > 0) {
      this.setState({ selectedBranch: slc });
    }
  };
  render() {
    const { coverImageError, productImagePreview } = this.state;
    return (
      <div className="add_menu_item">
        <Spinner loading={this.state.loading} />
        <h3>Add Menu Item</h3>
        <div className="add_menu_item_form">
          <div className="add_form_control">
            <label htmlFor="pName">Product Name</label>
            <input
              value={this.state.productName}
              type="text"
              id="pName"
              onChange={(e) => this.setState({ productName: e.target.value })}
            />
          </div>
          <div className="add_form_control-select">
            <label htmlFor="pDesc">
              Merchant
              {this.state.currentMerchant && (
                <>
                  {" "}
                  <strong>: {this.state.currentMerchant}</strong>
                </>
              )}
            </label>

            <Select
              isDisabled={this.state.isDisable || this.props.bid}
              options={this.state.loadedGroups}
              onChange={(e) => this.setState({ selectedMerchant: e })}
              value={this.state.selectedMerchant}
              className="basic-multi-select"
              isMulti
              classNamePrefix="select"
            ></Select>
          </div>
          <div className="add_form_control-select">
            <label htmlFor="pDesc">
              Branch
              {this.state.currentBranch && (
                <>
                  {" "}
                  <strong>: {this.state.currentBranch}</strong>
                </>
              )}
            </label>

            <Select
              isDisabled={this.state.isDisable || this.props.bid}
              options={this.state.loadedBranch}
              onChange={(e) => this.onSelectBranch(e)}
              value={this.state.selectedBranch}
              className="basic-multi-select"
              isMulti
              classNamePrefix="select"
            ></Select>
          </div>
          <div className="add_form_control">
            <div className="cover__image">
              <p>Product Image image</p>
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
                  accept=".png, .jpg, .jpeg"
                />
              </div>
            </div>
          </div>
          <div className="add_form_control">
            <label htmlFor="pDesc">Product Description</label>
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
            <label htmlFor="pPrice">Product Price</label>
            <input
              type="number"
              id="pPrice"
              onChange={(e) => this.setState({ productPrice: e.target.value })}
              value={this.state.productPrice}
            />
          </div>
          <div className="add_form_control">
            <label htmlFor="pTags">Product Tags</label>
            <div className="tags_box">
              {this.state.tags.map((tag, index) => (
                <div className="tags">
                  <span>{tag}</span>
                </div>
              ))}
            </div>
            <form onSubmit={this.tagHandler}>
              <input
                onChange={(e) => this.setState({ singleTag: e.target.value })}
                type="text"
                id="pTags"
                value={this.state.singleTag}
              />
            </form>
          </div>
          <div className="add_form_control">
            <label
              htmlFor="pTags"
              style={{ display: "flex", flexDirection: "row" }}
            >
              Additional Items <div onClick={this.addInput}>+</div>
            </label>

            {this.state.additionalItems.map((data, i) => (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <input
                  placeholder="Name"
                  type="text"
                  onChange={(e) => this.handleChange(i, e, "name")}
                  value={data.name || ""}
                />
                <input
                  placeholder="Quantity"
                  type="text"
                  value={data.quantity || ""}
                  onChange={(e) => this.handleChange(i, e, "quantity")}
                />
                <input
                  placeholder="Price"
                  type="text"
                  value={data.price || ""}
                  onChange={(e) => this.handleChange(i, e, "price")}
                />
              </div>
            ))}
          </div>
          <div className="add_form_control">
            <label htmlFor="pStatus">Product Status</label>
            <select
              name="pStatus"
              id="pStatus"
              onChange={(e) => this.setState({ status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button onClick={this.submit}>Save</button>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user.user,
    role: state.user.role,
    mid: state.user.mid,
    bid: state.user.bid,
  };
};

export default connect(mapState)(AddMenu);
