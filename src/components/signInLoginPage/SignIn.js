import React, { useState } from "react";
import "./signInStyle.css";
import * as firebase from "firebase";
import "../../firebase";

function SignIn() {
  const [signInValue, setSignInValue] = useState({
    name: "",
    signInEmail: "",
    signInPassword: "",
  });
  const [logInValue, setLogInvalue] = useState({
    LoginInEmail: "",
    LoginPassword: "",
  });

  const changeHandlerSignIn = (e) => {
    setSignInValue({
      ...signInValue,
      [e.target.name]: e.target.value,
    });
  };

  const changeHandlerLogIn = (e) => {
    setLogInvalue({
      ...logInValue,
      [e.target.name]: e.target.value,
    });
  };

  const clickHandlerSignIn = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        signInValue.signInEmail,
        signInValue.signInPassword
      )
      .then(() => {
        setSignInValue({
          name: "",
          signInEmail: "",
          signInPassword: "",
        });
      })
      .then(() => {
        let myuser = firebase.auth().currentUser;

        myuser.updateProfile({
          displayName: signInValue.name,
        });
      })
      .catch((error) => {
        alert(error.code);
        setSignInValue({
          name: "",
          signInEmail: "",
          signInPassword: "",
        });
      });
  };

  const clickHandlerLogIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(
        logInValue.LoginInEmail,
        logInValue.LoginPassword
      )
      .catch((error) => {
        alert(error.code);
        setLogInvalue({
          LoginInEmail: "",
          LoginPassword: "",
        });
      });
  };

  return (
    <>
      <div className="main-sign-in_log-in_container">
        <div className="sign_in_container">
          <h2>Sign-in</h2>
          <input
            type="text"
            name="name"
            value={signInValue.name}
            placeholder="Enter name"
            onChange={(e) => {
              changeHandlerSignIn(e);
            }}
          />
          <br />
          <input
            type="text"
            name="signInEmail"
            placeholder="Enter email"
            value={signInValue.signInEmail}
            onChange={(e) => {
              changeHandlerSignIn(e);
            }}
          />
          <br />
          <input
            type="password"
            name="signInPassword"
            placeholder="enter password"
            value={signInValue.signInPassword}
            onChange={(e) => {
              changeHandlerSignIn(e);
            }}
          />
          <br />
          <input
            type="button"
            value="Sign-in"
            onClick={(e) => {
              clickHandlerSignIn(e);
            }}
          />
        </div>
        <div className="login_in_container">
          <h2>login-in</h2>
          <input
            type="text"
            name="LoginInEmail"
            value={logInValue.LoginInEmail}
            placeholder="Enter email"
            onChange={(e) => {
              changeHandlerLogIn(e);
            }}
          />
          <br />
          <input
            type="password"
            name="LoginPassword"
            value={logInValue.LoginPassword}
            placeholder="enter password"
            onChange={(e) => {
              changeHandlerLogIn(e);
            }}
          />
          <br />
          <input
            type="button"
            value="login-in"
            onClick={(e) => {
              clickHandlerLogIn(e);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default SignIn;
