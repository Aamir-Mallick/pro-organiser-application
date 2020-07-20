import React, { useState, useEffect } from "react";
import "./cardFormStyles.css";
import * as firebase from "firebase";
import "../../firebase";

function CardForm(props) {
  const [upDateTask, setUpDatetask] = useState("");
  const [upDateMember, setUpDateMember] = useState("");
  const [upDateDescription, setUpDateDescription] = useState("");
  const [task, setTask] = useState("hello");
  const [member, setMember] = useState("" || upDateMember);
  const [description, setDescription] = useState("" || upDateDescription);

  const [mainNode, setMainNode] = useState("");
  const [firstChildNode, setFirstChildNode] = useState("");
  const [secondChildNode, setSecontChildNode] = useState("");
  const [secondChildNodeEdit, setSecontChildNodeEdit] = useState("");
  const [thirdChildNode, setThirdChildNode] = useState("");

  useEffect(() => {
    setMainNode(props.mainNode);
    setFirstChildNode(props.firstChildNode);
    setSecontChildNode(props.secondChildNode);
    setSecontChildNodeEdit(props.secondChildNodeEdit);
    setThirdChildNode(props.thirdChildNode);

    getDataForUpdate([upDateTask]);
  }, [
    props.mainNode,
    props.firstChildNode,
    props.secondChildNode,
    props.secondChildNodeEdit,
    props.thirdChildNode,
  ]);

  const getDataForUpdate = (e) => {
    firebase
      .database()
      .ref(
        `${props.mainNode}/${props.firstChildNode}/${props.secondChildNodeEdit}/${props.thirdChildNode}`
      )
      .once("value")
      .then((snapShot) => {
        setUpDatetask(snapShot.val().task);
      });
  };

  const taskChangeHandler = (e) => {
    setTask(e.target.value);
  };

  const memberChangeHandler = (e) => {
    setMember(e.target.value);
  };

  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  };

  const onSubmitValue = () => {
    firebase
      .database()
      .ref(`${mainNode}/${firstChildNode}/${secondChildNode}`)
      .push({
        task: task,
        member: member,
        description: description,
      });
    props.popUpCard();
  };

  return (
    <>
      {console.log(task)}
      <div className="card_form_main_container">
        <div className="card_form_inner_container">
          <h2>Add card</h2>
          <label>Enter a title for your task</label>
          <br />
          <input
            type="text"
            name="task"
            value={task}
            onChange={(e) => {
              taskChangeHandler(e);
            }}
          />
          <br />
          <label>Choose member for this task(select multiple, if needed)</label>
          <br />
          <input
            type="text"
            name="member"
            value={member}
            onChange={(e) => {
              memberChangeHandler(e);
            }}
          />
          <br />
          <label>Add the description for your task</label>
          <br />
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => {
              descriptionChangeHandler(e);
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
