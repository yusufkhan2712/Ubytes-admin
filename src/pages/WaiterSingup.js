import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db, { auth, storage } from "../firebase";
import actions from "../redux/user/userActions";
import { connect } from "react-redux";
import Select from "react-select";

const WaiterSignup = ({ addUser, user, addRole }) => {
  const [bEmail, setBEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branch, setBranch] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [password2, setPassword2] = useState("");

  const SignupHandler = (e) => {
    e.preventDefault();
    if (selectedBranch === "") {
      alert("Please Select a Branch");
    } else {
      if (password != password2) {
        alert("Please enter same password");
      }
     /*  auth
        .createUserWithEmailAndPassword(bEmail, password)
        .then(async (authUser) => {
          addUser(authUser.user);
          addRole("Waiter");
          await db.collection("Waiterauth").doc(authuser.user.id).set({
            merchandId: user.uid,
            branchId: user.email,
            role: "Waiter",
          });
          alert("Waiter Signup successful");
          return authUser.user.updateProfile({
            displayName: "Waiter",
          });
        })
        .catch((err) => alert(err.message)); */
    }
  };

  return (
    <div className="login-main">
      <div className="login-body">
        <div className="login-branding">
          <p>Waiter Signup Authentication Form</p>
        </div>
        <br></br>
        <form className="login-form" onSubmit={SignupHandler}>
          <div>
            <p>Waiter Email</p>
            <input
              onChange={(e) => setBEmail(e.target.value)}
              placeholder="Waiter Email"
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
          <div>
            <p>Confirm Password</p>
            <input
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="Password"
              className="login-form-input"
              type="password"
              value={password2}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Signup
          </button>
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

const mapState = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapState, mapDispatch)(WaiterSignup);
