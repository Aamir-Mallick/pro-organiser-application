import React, { useState } from "react";

import RouterContainer from "./components/allRoute/RouteContainer";
import SignIn from "./components/signInLoginPage/SignIn";
import * as firebase from "firebase";
import "./firebase";

import "./App.css";

function App() {
  const [uservalue, setUser] = useState(null);
  const [databaseId, setDataBaseId] = useState("");

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setDataBaseId(user.uid);
      setUser(user);
    } else {
      setUser(null);
    }
  });

  return (
    <>{uservalue ? <RouterContainer databaseId={databaseId} /> : <SignIn />}</>
  );
}

export default App;
