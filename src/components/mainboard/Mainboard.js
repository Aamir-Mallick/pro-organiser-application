import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./mainBoardStyle.css";
import Column from "../common/Column";
import CardForm from "../cardDetails/CardForm";
import CardPopUpDetails from "../cardPopUpDetails/CardPopUpDetails";
import * as firebase from "firebase";
import "../../firebase";

function Mainboard(props) {
  const [addColumn, setAddColumn] = useState(false);
  const [mainNode, setMainNode] = useState("");
  const [firstChildNode, setFirstChildNode] = useState("");
  const [secondChildNode, setSecontChildNode] = useState("");
  const [arrayColumn, setArrayColumn] = useState([]);
  const [cardPopUp, setCardPopUp] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(null);
  const [cardDetilsModal, setShowCardDetailModal] = useState(false);
  const [secondChildNodeEdit, setSecontChildNodeEdit] = useState("");
  const [thirdChildNode, setThirdChildNode] = useState("");

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
              return [...arrayColumn, { id: items.key, myId: items.val() }];
            });
          }
        });
      });
  };

  const onClickHandler = () => {
    setAddColumn(!addColumn);
    addValue();
  };

  const onClickCardHandler = (e, id) => {
    setSecontChildNode(id);
    setCardPopUp(true);
  };

  const editHandler = (a, b) => {
    setSecontChildNodeEdit(a);
    setThirdChildNode(b);
    setCardPopUp(true);
  };

  const onCloseCard = () => {
    setCardPopUp(false);
  };

  const taskHandler = (columnId, cardId) => {
    firebase
      .database()
      .ref(`${props.id}/${params.uid}/${columnId}/${cardId}`)
      .once("value")
      .then((data) => {
        setShowCardDetails(data.val());
      })
      .then(() => {
        setShowCardDetailModal(true);
      });
  };

  const closePopUpcardDetails = () => {
    setShowCardDetailModal(false);
  };

  const deleteCardHandler = (v1, v2) => {
    firebase.database().ref(`${props.id}/${params.uid}/${v1}/${v2}`).remove();
    addValue();
  };

  return (
    <>
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
                <span>{x.myId.columnName}</span>
                <button>delete</button> <br />
                <button
                  onClick={(e) => {
                    onClickCardHandler(e, x.id);
                  }}
                >
                  add card
                </button>
                {arrayColumn
                  .filter((items) => {
                    return items.id === x.id;
                  })
                  .map((taskObject, index) => {
                    const myIdValue = taskObject.myId;
                    const tasksArray = Object.entries(myIdValue);
                    const taskDisc = tasksArray.map((task) => {
                      const [id, taskDetails] = task;

                      if (!taskDetails.task) {
                        return null;
                      }

                      return (
                        <div key={id}>
                          <span
                            onClick={() => {
                              taskHandler(x.id, id);
                            }}
                          >
                            {taskDetails.task}
                          </span>
                          <button
                            onClick={() => {
                              editHandler(x.id, id);
                            }}
                          >
                            edit
                          </button>
                          <button
                            onClick={() => {
                              deleteCardHandler(x.id, id);
                            }}
                          >
                            delete
                          </button>
                        </div>
                      );
                    });

                    return <div key={index}>{taskDisc}</div>;
                  })}
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
            onCloseCard();
          }}
          mainNode={mainNode}
          firstChildNode={firstChildNode}
          secondChildNode={secondChildNode}
          secondChildNodeEdit={secondChildNodeEdit}
          thirdChildNode={thirdChildNode}
        />
      ) : null}

      {cardDetilsModal ? (
        <CardPopUpDetails
          cardData={showCardDetails}
          closePopUp={() => {
            closePopUpcardDetails();
          }}
        />
      ) : null}
    </>
  );
}

export default Mainboard;
