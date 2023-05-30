import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import db, { auth, storage } from "../firebase";
import actions from "../redux/user/userActions";
import { connect } from "react-redux";

const Signup = ({ addUser, addRole }) => {
  const [resName, setResName] = useState("");
  const [outlets, setOutlets] = useState(0);
  const [bName, setBName] = useState("");
  const [bAdd, setBAdd] = useState("");
  const [bNumber, setBNumber] = useState(Number);
  const [bEmail, setBEmail] = useState("");
  const [password, setPassword] = useState("");

  const SignupHandler = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(bEmail, password)
      .then((authUser) => {
        addUser(authUser.user);
        addRole("Merchant");
        db.collection("Merchant").doc(authUser.user.id).set({
          restaurentName: resName,
          outlets: outlets,
          brandName: bName,
          brandAddress: bAdd,
          brandNumber: bName,
          role: "Merchant",
        });
        db.collection("users").add({
          email: bEmail,
          password: password,
          role: "Merchant",
          brandName: bName,
        });
        localStorage.setItem(
          "merchant-data",
          JSON.stringify({ mid: authUser.user.id })
        );
        return authUser.user.updateProfile({
          displayName: bName,
        });
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login-main">
      <div className="login-body">
        <div className="login-branding">
          <i
            class="fas fa-hamburger"
            style={{ color: "lightblue", marginRight: "10px" }}
          ></i>
          <p>uBytes</p>
        </div>
        <br></br>
        <div className="login-form-section">
          <strong>
            <p className="login-title">Try uBytes free for 30 days</p>
          </strong>
          <br></br>
          <p style={{ fontSize: "small" }}>
            No credit card required. Cancel anytime
          </p>
          <br></br>
          {/* <div className="signup-steps">
              <p style={{ fontSize: "medium" }}>
                <Badge pill variant="primary">
                  1
                </Badge>{" "}
                Registration
              </p>
              <div className="sperator-line"></div>
              <p style={{ fontSize: "medium" }}>
                <Badge pill variant="secondary">
                  2
                </Badge>
                Account Setup
              </p>
            </div> */}
        </div>
        <form className="login-form" onSubmit={SignupHandler}>
          <div>
            <p>What's the name of your restaurent? *</p>

            <input
              placeholder="Enter your restaurent name"
              className="login-form-input"
              onChange={(e) => setResName(e.target.value)}
              value={resName}
              required
            />
          </div>
          <br />
          <div>
            <p>How many outlets do you have? *</p>
            <select
              className="login-form-select"
              onChange={(e) => setOutlets(e.target.value)}
              value={outlets}
              required
            >
              <option value="0">Select Outlets</option>
              <option value="1">1 outlet</option>
              <option value="2">2 - 5 outlets</option>
              <option value="3">5 - 10 outlets</option>
              <option value="4">10+ outlets</option>
            </select>
          </div>
          <br />
          <div>
            <p>Brand Name</p>
            <input
              onChange={(e) => setBName(e.target.value)}
              placeholder="Brand Name"
              className="login-form-input"
              type="text"
              value={bName}
              required
            />
          </div>
          <br />
          <div>
            <p>Brand Address</p>
            <input
              onChange={(e) => setBAdd(e.target.value)}
              placeholder="Brand Address"
              className="login-form-input"
              type="text"
              value={bAdd}
              required
            />
          </div>
          <br />
          <div>
            <p>Brand Number</p>
            <input
              onChange={(e) => setBNumber(e.target.value)}
              placeholder="Brand Number"
              className="login-form-input"
              type="number"
              value={bNumber}
              required
            />
          </div>
          <br />
          <div>
            <p>Brand Email</p>
            <input
              onChange={(e) => setBEmail(e.target.value)}
              placeholder="Brand Email"
              className="login-form-input"
              type="email"
              value={bEmail}
              required
            />
          </div>
          <br />
          <div>
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="login-form-input"
              type="password"
              value={password}
              required
            />
          </div>

          <button className="login-button">Signup</button>
          <br></br>
          <br></br>
          <p style={{ textAlign: "center" }}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>

      <div className="login-right-section"></div>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    addUser: (user) => dispatch({ type: actions.SET_USER, user: user }),
    addRole: (role) => dispatch({ type: actions.SET_ROLE, role: role }),
  };
};

export default connect(null, mapDispatch)(Signup);
