import React, { useState, useEffect } from "react";
import "./cardEditStyle.css";
import * as firebase from "firebase";
import "../../firebase";

function CardEdit(props) {
  const [upDatedInpuValues, setUpDatedInputValues] = useState({
    task: "",
    member: "",
    description: "",
  });
  const [inputValues, setInputValue] = useState({
    task: "",
    member: "",
    description: "",
  });

  useEffect(() => {
    getDataForUpdate();
  }, [
    upDatedInpuValues.task,
    upDatedInpuValues.member,
    upDatedInpuValues.description,
  ]);

  const getDataForUpdate = (e) => {
    firebase
      .database()
      .ref(
        `${props.mainNode}/${props.firstChildNode}/${props.secondChildNodeEdit}/${props.thirdChildNode}`
      )
      .once("value")
      .then((snapShot) => {
        setUpDatedInputValues({
          task: snapShot.val().task,
          member: snapShot.val().member,
          description: snapShot.val().description,
        });
      })
      .then(() => {
        setInputValue({
          ...inputValues,
          task: upDatedInpuValues.task,
          member: upDatedInpuValues.member,
          description: upDatedInpuValues.description,
        });
      });
  };

  const ChangeHandler = (e) => {
    setInputValue({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitValue = () => {
    firebase
      .database()
      .ref(
        `${props.mainNode}/${props.firstChildNode}/${props.secondChildNodeEdit}/${props.thirdChildNode}`
      )
      .set(inputValues);
    props.popUpCard();
  };

  const popUpClose = () => {
    props.popUpCard();
  };

  return (
    <>
      <div className="card_edit_main_container">
        <div className="card_edit_inner_container">
          <button className="" onClick={popUpClose}>
            X
          </button>
          <h2>Update Card</h2>
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
            value="Update Card"
            onClick={() => {
              onSubmitValue();
            }}
          />
        </div>
      </div>
    </>
  );
}

export default CardEdit;
