import React, { useState, useEffect } from "react";
import "./cardFormStyles.css";
import * as firebase from "firebase";
import "../../firebase";

function CardForm(props) {
  const [inputValues, setInputValue] = useState({
    task: "",
    member: "",
    description: "",
  });

  const ChangeHandler = (e) => {
    setInputValue({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitValue = () => {
    firebase
      .database()
      .ref(`${props.mainNode}/${props.firstChildNode}/${props.secondChildNode}`)
      .push(inputValues);
    props.popUpCard();
  };

  const popUpClose = () => {
    props.popUpCard();
  };

  return (
    <>
      <div className="card_form_main_container">
        <div className="card_form_inner_container">
          <button className="" onClick={popUpClose}>
            X
          </button>
          <h2>Add card</h2>
          <label>Enter a title for your task</label>
          <br />
          <input
            type="text"
            name="task"
            value={inputValues.task}
            onChange={(e) => {
              ChangeHandler(e);
            }}
          />
          <br />
          <label>Choose member for this task(select multiple, if needed)</label>
          <br />
          <input
            type="text"
            name="member"
            value={inputValues.member}
            onChange={(e) => {
              ChangeHandler(e);
            }}
          />
          <br />
          <label>Add the description for your task</label>
          <br />
          <input
            type="text"
            name="description"
            value={inputValues.description}
            onChange={(e) => {
              ChangeHandler(e);
            }}
          />
          <br />

          <br />
          <input
            type="button"
            value="Add Card"
            onClick={() => {
              onSubmitValue();
            }}
          />
        </div>
      </div>
    </>
  );
}

export default CardForm;
