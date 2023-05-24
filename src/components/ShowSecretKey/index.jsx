/*global chrome*/
import React from "react";
import { generateKey } from "../../utils/index";
import { useEffect } from "react";

const ShowSecretKey = ({
  newSecretKey,
  setNewsecretKey,
  setLoggedIn,
  setConfirmPage,
}) => {
  chrome.storage.sync.get("secretKey", ({ secretKey }) => {
    console.log(window.atob(secretKey), secretKey);
    setNewsecretKey(window.atob(secretKey));
  });

  const onreGenrate = () => {
    const secret = generateKey();
    chrome.storage.sync.set({ secretKey: window.btoa(secret) });
    setNewsecretKey(secret);
  };

  const handleLogout = () => {
    const value = window.confirm("Do you want to reset the application");
    if (value) {
      chrome.storage.sync.remove(["password", "userLoggedIn"]);
      chrome.storage.sync.get("secretKey", ({ secretKey }) => {
        chrome.storage.sync.set({ secretKey: window.atob(secretKey) });
      });
      setLoggedIn(false);
      setConfirmPage(true);
    } else {
      chrome.storage.sync.set({ userLoggedIn: false });
      setLoggedIn(false);
    }
  };

  return (
    <div className="container">
      <div>
        <h4>
          <b>Secret key :-</b>
          {newSecretKey}
        </h4>
      </div>
      <div>
        <button onClick={onreGenrate}>Re-generate key</button>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
};

export default ShowSecretKey;
