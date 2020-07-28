import React, { useState } from "react";
import "./createFormPageStyle.css";
import * as firebase from "firebase";
import { useHistory } from "react-router-dom";
import "../../firebase";

function Createformpage(props) {
  const usehistory = useHistory();

  const [board, setBoard] = useState({
    boardName: "",
    teamMember: "",
    boardType: "",
  });

  const ChangeHandler = (e, val) => {
    setBoard({
      ...board,
      [val]: e.target.value,
    });
  };

  const onclickHandler = (myval) => {
    firebase
      .database()
      .ref(props.id)
      .push(myval)
      .then(() => {
        usehistory.push("/");
      });
  };

  return (
    <div className="form_nain_container" style={{ color: "blue" }}>
      <p className="mylable">Create a Board</p>

      <br />

      <form>
        <label className="mylable">Enter a name of your board</label>
        <br />
        <input
          type="text"
          id="name"
          onChange={(e) => {
            ChangeHandler(e, "boardName");
          }}
        />
        <br />
        <br />
        <label className="mylable">Add your team member</label>
        <br />
        <input
          type="text"
          id="team"
          onChange={(e) => {
            ChangeHandler(e, "teamMember");
          }}
        />
        <br />
        <br />
        <label className="mylable">Enter the type of your board</label>
        <br />
        <input
          type="text"
          id="type"
          onChange={(e) => {
            ChangeHandler(e, "boardType");
          }}
        />
        <br />
        <br />
        <input
          type="button"
          id="CreateBoard"
          value="create"
          onClick={() => {
            onclickHandler(board);
          }}
        />
      </form>
    </div>
  );
}

export default Createformpage;
