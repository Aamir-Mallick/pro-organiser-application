import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import "../../firebase";

import "./homePageStyle.css";
import { useHistory } from "react-router-dom";

function Homepage(props) {
  const [boardData, setboardData] = useState([]);
  const usehistory = useHistory();

  useEffect(() => {
    additems(props.id);
  }, []);
  const additems = (myData) => {
    firebase
      .database()
      .ref(myData)
      .once("value")
      .then((snapShot) => {
        snapShot.forEach((items) => {
          setboardData((boardData) => {
            return [...boardData, { id: items.key, ...items.val() }];
          });
        });
      });
  };

  const logOut = () => {
    firebase.auth().signOut();
  };

  const clickHandler = (val1, val2) => {
    usehistory.push(`/${val1}/${val2}`);
  };

  return (
    <>
      <div>
        <div></div>
        <input
          type="button"
          onClick={logOut}
          value="signOut"
          className="btnSignIn"
        />
      </div>
      <div className="home_page_nain_container">
        {boardData.map((items) => {
          return (
            <div key={items.id}>
              <div
                onClick={() => {
                  clickHandler(items.boardName, items.id);
                }}
                className="home_page_inner_container"
              >
                {items.boardName}
              </div>
            </div>
          );
        })}
      </div>
      {boardData.length ? null : (
        <p>
          please cleate board by clicking on createboard on the top right corner
        </p>
      )}
    </>
  );
}

export default Homepage;
