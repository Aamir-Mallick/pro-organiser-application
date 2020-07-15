import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./mainBoardStyle.css";
import Column from "../common/Column";
import CardForm from "../cardDetails/CardForm";
import * as firebase from "firebase";
import "../../firebase";

function Mainboard(props) {
  const [addColumn, setAddColumn] = useState(false);
  const [mainNode, setMainNode] = useState("");
  const [firstChildNode, setFirstChildNode] = useState("");
  const [secondChildNode, setSecontChildNode] = useState("");
  const [arrayColumn, setArrayColumn] = useState([]);
  const [cardPopUp, setCardPopUp] = useState(false);

  const params = useParams();

  useEffect(() => {
    setMainNode(props.id);
    setFirstChildNode(params.uid);
    addValue();
  }, [props.id, params.uid]);

  const addValue = () => {
    setArrayColumn([]);
    firebase
      .database()
      .ref(`${props.id}/${params.uid}`)
      .once("value")
      .then((snapShot) => {
        snapShot.forEach((items) => {
          if (
            items.key !== "boardName" &&
            items.key !== "boardType" &&
            items.key !== "teamMember"
          ) {
            setArrayColumn((arrayColumn) => {
              return [...arrayColumn, { id: items.key, ...items.val() }];
            });
          }
        });
      });
  };

  const onClickHandler = () => {
    setAddColumn(!addColumn);
  };

  const onClickCardHandler = (e, id) => {
    setSecontChildNode(id);
    setCardPopUp(!cardPopUp);
  };

  return (
    <>
      {console.log(secondChildNode)}
      {console.log(arrayColumn)}
      <div className="board_heading">
        <div className="board_heading_text">{params.name}</div>
        <div className="board_delete_button">
          <button className="delete_button">Delete Board</button>
        </div>
      </div>
      {/*login for the coloumn starting here */}
      <div className="main_board_column_container">
        <div className="main_board_content_container">
          {arrayColumn.map((x) => {
            return (
              <div key={x.id} className="main_board_inner_column_container">
                <span>{x.columnName}</span>
                <button>delete</button> <br />
                <button
                  onClick={(e) => {
                    onClickCardHandler(e, x.id);
                  }}
                >
                  add card
                </button>
              </div>
            );
          })}
        </div>
        {/*add column button logic*/}
        <div className="main_board_container">
          <div
            className="main_board_click_container"
            onClick={() => {
              onClickHandler();
            }}
          >
            add column
          </div>
        </div>
      </div>

      {addColumn ? (
        <Column
          popupToggle={() => {
            onClickHandler();
          }}
          mainNode={mainNode}
          firstChildNode={firstChildNode}
        />
      ) : null}

      {cardPopUp ? (
        <CardForm
          popUpCard={() => {
            onClickCardHandler();
          }}
          mainNode={mainNode}
          firstChildNode={firstChildNode}
          secondChildNode={secondChildNode}
        />
      ) : null}
    </>
  );
}

export default Mainboard;
