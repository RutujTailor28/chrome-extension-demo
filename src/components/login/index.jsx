/*global chrome*/
import React, { useState } from "react";

const Login = ({ setLoggedIn }) => {
  const [pass, setPass] = useState();
  const onSubmit = (e) => {
    e.preventDefault();
    chrome.storage.sync.get("password", ({ password }) => {
      if (window.atob(password) === pass) {
        setLoggedIn(true);
        chrome.storage.sync.set({ userLoggedIn: true });
      }
    });
  };
  return (
    <div className="container">
      <form>
        <h2>Login</h2>
        <div className="formItem">
          <label>Password</label>
          <input type="password" onChange={(e) => setPass(e.target.value)} />
        </div>
        <button type="submit" onClick={onSubmit}>
          SignIn
        </button>
      </form>
    </div>
  );
};

export default Login;
