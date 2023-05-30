import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const loginHandler = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(history.push("/dashboard"))
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
            <p className="login-title">Welcome to uBytes</p>
          </strong>
          <br></br>
          <p style={{ fontSize: "small" }}>It's good to see you again!</p>
          <br></br>
          <p style={{ fontSize: "small" }}>
            Type your login information and we will take you to your dashboard
            right away.
          </p>
        </div>
        <form onSubmit={loginHandler} className="login-form">
          <div>
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter Email"
              className="login-form-input"
              type="email"
            />
          </div>
          <br />
          <div>
            <div>
              <p>Password</p>
            </div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
              className="login-form-input"
              type="password"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>

          <p style={{ textAlign: "center" }}>
            Don't have an account? <Link to="/signup">Signup now</Link>
          </p>
        </form>
      </div>
      <div className="login-right-section"></div>
    </div>
  );
};

export default Login;
