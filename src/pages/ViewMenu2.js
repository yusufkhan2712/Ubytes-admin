import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import db, { storage } from "../firebase";
import { useHistory } from "react-router-dom";
import { Table } from "react-bootstrap";
import Select from "react-select";


const ViewMenu2 = ({ user, role, mid, bid }) => {
  const [branch, setBranch] = useState({ id: "null", data: [{}] });
  const [product, setProduct] = useState([]);
  const [branchId, setBranchId] = useState("");
  const [merchantId, setMerchantId] = useState(null);
  const [option, setOption] = useState([]);
  const [isDisable, setIsDisable] = useState(false);
  const [merchants, setMerchants] = useState([]);
  const [branches, setBranches] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (role === "Branch") {
      setBranchId(bid);
      setIsDisable(true);
    } else {
      getbran();
    }
  }, []);
  const getMerchants = async () => {
    let merchants_ = [];
    let merchants__ = await db.collection("Merchant").get();
    merchants__.docs.forEach((merchant) => {
      merchants_.push({
        label: merchant.data().brandName,
        value: merchant.id,
      });
    });
    setMerchants(merchants_);
  };
  const getBranches = async () => {
    if (merchantId) {
      let branches_ = [];
      let branches__ = await db
        .collection("Branches")
        .where("merchantId", "==", merchantId.value)
        .get();
      branches__.docs.forEach((branch) => {
        branches_.push({
          label: branch.data().branchName,
          value: branch.id,
        });
      });
      setBranches(branches_);
    }
  };

  // useEffect(() => {
  //   if (role === "Branch") {
  //     productHandler();
  //   }
  // }, []);

  useEffect(() => {
    getMerchants();
  }, []);
  useEffect(() => {
    getBranches();
  }, [merchantId]);

  const getbran = () => {
    db.collection("Merchant")
      .doc(user.uid)
      .collection("Branches")
      .onSnapshot((snapshot) => {
        setBranch({
          id: snapshot.docs.map((doc) => doc.id),
          data: snapshot.docs.map((doc) => doc.data()),
        });
        console.log(branch);
      });
  };

  const productHandler = () => {
    if (branchId === "") {
      alert("Select a Product");
    } else {
      db.collection("Products").onSnapshot((snap) => {
        setProduct(snap.docs.map((doc) => doc.data()));
        console.log(product);
      });
    }
  };

  const deleteHandler = (id) => {
    db.collection("Products").doc(id).delete();
  };

  const getOption = () => {
    const op = [];
    branch.data.map((bran, i) => {
      op.push({ value: branch.id[i], label: bran.branchName });
      setOption(op);
    });
  };

  const branchSelect = (branchId) => {
    setBranchId(branchId);
    console.log(branchId.value);
  };

  return (
    <div className="product_view">
      <div className="product_view_form">
        {!isDisable && (
          <Select
            isDisabled={isDisable}
            placeholder="Select Merchant"
            value={merchantId}
            onChange={(e) => setMerchantId(e)}
            options={merchants}
          />
        )}
        {!isDisable && (
          <Select
            isDisabled={isDisable}
            placeholder="Select Branch"
            value={branchId}
            onChange={branchSelect}
            options={branches}
          />
        )}
        <button onClick={productHandler}>
          {isDisable ? "Load Product" : "Search"}
        </button>
      </div>
      <div className="menu_table_parent">
        <Table striped bordered hover>
          <thead>
            <tr>
              <td>Id</td>
              <td>Product Image</td>
              <td>Product Name</td>
              <td>Product Price</td>
              <td>Edit</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {product.map((prod, index) => {
              return (
                <tr key={prod.productId}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={prod.productImage}
                      width={100}
                      height={100}
                      alt=""
                    />
                  </td>
                  <td>{prod.productName}</td>
                  <td>{prod.productPrice}</td>
                  <td>
                    <button
                      onClick={() =>
                        history.push(
                          `/edit/menu/edit?bid=${
                            bid ? bid : branchId.value
                          }&id=${prod.productId}`
                        )
                      }
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button onClick={() => deleteHandler(prod.productId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.user.user,
    role: state.user.role,
    bid: state.user.bid,
    mid: state.user.mid,
  };
};

export default connect(mapState)(ViewMenu2);
