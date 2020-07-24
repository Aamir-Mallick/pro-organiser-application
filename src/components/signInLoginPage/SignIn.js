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
        <div className="login_in_container">
          <div className="login_inner_container">
            <div className="proOrganizer">Pro-Orginzer</div>
            <div className="login_page">
              <input
                id="LoginInEmail"
                type="text"
                name="LoginInEmail"
                value={logInValue.LoginInEmail}
                placeholder="Enter email"
                onChange={(e) => {
                  changeHandlerLogIn(e);
                }}
              />

              <input
                id="LoginPassword"
                type="password"
                name="LoginPassword"
                value={logInValue.LoginPassword}
                placeholder="Enter password"
                onChange={(e) => {
                  changeHandlerLogIn(e);
                }}
              />

              <input
                id="login_value_input"
                type="button"
                value="login-in"
                onClick={(e) => {
                  clickHandlerLogIn(e);
                }}
              />
            </div>
          </div>
        </div>
        <div className="sign_in_container">
          <div className="sign_in_container_inner_text">
            This is an where you can experince new kind of world where there is
            great colabration between team and you can keep track of your work,
            and you can share with your team mates as well it will improve your
            productivity and will give you new kind of experince
          </div>
          <div className="sign_in_container_inner">
            <label className="label">Enter your name</label>
            <br />
            <input
              type="text"
              id="signInName"
              name="name"
              value={signInValue.name}
              placeholder="Enter name"
              onChange={(e) => {
                changeHandlerSignIn(e);
              }}
            />
            <br />
            <label className="label">Enter your Email</label>
            <br />
            <input
              id="signInEmail"
              type="text"
              name="signInEmail"
              placeholder="Enter email"
              value={signInValue.signInEmail}
              onChange={(e) => {
                changeHandlerSignIn(e);
              }}
            />
            <br />
            <label className="label">Enter your password</label>
            <br />
            <input
              id="signInPassword"
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
              id="inputValueSignIn"
              type="button"
              value="Sign-in"
              onClick={(e) => {
                clickHandlerSignIn(e);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
