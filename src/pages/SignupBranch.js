import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db, { auth, storage } from "../firebase";
import actions from "../redux/user/userActions";
import { connect } from "react-redux";
import Select from "react-select";

const SignupBranch = ({ addUser, user, addRole }) => {
  const [bEmail, setBEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branch, setBranch] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [password2, setPassword2] = useState("");
  useEffect(() => {
    loadbranch();
  }, []);

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
          addRole("Branch");
          await db.collection("Branchauth").doc(authuser.user.id).set({
            merchandId: user.uid,
            branchId: selectedBranch,
            role: "Branch",
          });
          alert("Branch Signup successful");
          return authUser.user.updateProfile({
            displayName: "Branch",
          });
        })
        .catch((err) => alert(err.message)); */
    }
  };

  const loadbranch = () => {
    db.collection("Merchant")
      .doc(user.uid)
      .collection("Branches")
      .onSnapshot((snapshot) =>
        setBranch(
          snapshot.docs.map((doc) => {
            let _ = doc.data();
            _["value"] = _.brands;
            _["label"] = _.brands;
            return _;
          })
        )
      );
  };

  return (
    <div className="login-main">
      <div className="login-body">
        <div className="login-branding">
          <p>Branch Signup Authentication Form</p>
        </div>
        <br></br>
        <form className="login-form" onSubmit={SignupHandler}>
          <Select
            onChange={(e) => setSelectedBranch(e.value)}
            options={branch}
          ></Select>

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

export default connect(mapState, mapDispatch)(SignupBranch);
