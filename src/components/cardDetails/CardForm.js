import React, { useState, useEffect } from "react";
import "./cardFormStyles.css";
import * as firebase from "firebase";
import "../../firebase";

function CardForm(props) {
  const [inputValue, setInputValue] = useState({
    task: "",
    member: "",
    description: "",
  });

  const [mainNode, setMainNode] = useState("");
  const [firstChildNode, setFirstChildNode] = useState("");
  const [secondChildNode, setSecontChildNode] = useState("");

  useEffect(() => {
    setMainNode(props.mainNode);
    setFirstChildNode(props.firstChildNode);
    setSecontChildNode(props.secondChildNode);
  }, [props.mainNode, props.firstChildNode, props.secondChildNode]);

  const clickHandler = (e) => {
    firebase
      .database()
      .ref(`${mainNode}/${firstChildNode}/${secondChildNode}`)
      .push(inputValue);
    props.popUpCard();
  };

  const onChangeHandler = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitValue = () => {
    clickHandler();
  };

  return (
    <>
      <div className="card_form_main_container">
        <div className="card_form_inner_container">
          <h2>Add card</h2>
          <label>Enter a title for your task</label>
          <br />
          <input
            type="text"
            name="task"
            value={inputValue.task}
            onChange={(e) => {
              onChangeHandler(e);
            }}
          />
          <br />
          <label>Choose member for this task(select multiple, if needed)</label>
          <br />
          <input
            type="text"
            name="member"
            value={inputValue.member}
            onChange={(e) => {
              onChangeHandler(e);
            }}
          />
          <br />
          <label>Add the description for your task</label>
          <br />
          <input
            type="text"
            name="description"
            value={inputValue.description}
            onChange={(e) => {
              onChangeHandler(e);
            }}
          />
          <br />
          <label>select the due date for this task</label>
          <br />
          <input type="Data" />
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
