/*global chrome*/
import "./App.css";
import { useState } from "react";
import ConfirmPassword from "./components/confirmPassword";
import Login from "./components/login/index";
import ShowSecretKey from "./components/ShowSecretKey/index";
import { useEffect } from "react";

function App() {
  const [newSecretKey, setNewsecretKey] = useState();
  const [confirmPage, setConfirmPage] = useState();
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    chrome.storage.sync.get("password", ({ password }) => {
      setConfirmPage(!password);
      console.log("confirmPage", confirmPage, password);
    });
    chrome.storage.sync.get("userLoggedIn", ({ userLoggedIn }) => {
      setLoggedIn(userLoggedIn);
    });
  }, []);
  console.log("confirmPageNew", confirmPage);
  return (
    <div className="App">
      {confirmPage && <ConfirmPassword setConfirmPage={setConfirmPage} />}
      {!confirmPage && !isLoggedIn && <Login setLoggedIn={setLoggedIn} />}
      {!confirmPage && isLoggedIn && (
        <ShowSecretKey
          setNewsecretKey={setNewsecretKey}
          newSecretKey={newSecretKey}
          setLoggedIn={setLoggedIn}
          setConfirmPage={setConfirmPage}
        />
      )}
    </div>
  );
}

export default App;
