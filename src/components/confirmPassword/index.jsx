/*global chrome*/

import { useState } from "react";

const ConfirmPassword = ({ setConfirmPage }) => {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      chrome.storage.sync.get("secretKey", ({ secretKey }) => {
        chrome.storage.sync.set({ secretKey: window.btoa(secretKey) });
        chrome.storage.sync.set({ password: window.btoa(password) });
      });
      setConfirmPage(false);
    }
  };
  return (
    <div className="container">
      <form>
        <div className="formItem">
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="formItem">
          <label>Confirm Password</label>
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {password !== confirmPassword && (
            <span className="error">
              Confirm password should be match with password
            </span>
          )}
        </div>
        <button type="submit" onClick={onSubmit}>
          SignIn
        </button>
      </form>
    </div>
  );
};

export default ConfirmPassword;
