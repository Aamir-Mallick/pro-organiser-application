import React, { useState, useEffect } from "react";
import "./columnStyle.css";
import * as firebase from "firebase";
import "../../firebase";

function Column(props) {
  const [mainNode, setMainNode] = useState("");
  const [firstChildNode, setFirstChildNode] = useState("");
  const [columnName, setColumnName] = useState("");

  useEffect(() => {
    setMainNode(props.mainNode);
    setFirstChildNode(props.firstChildNode);
  }, []);

  const clickHandler = () => {
    props.popupToggle();
  };

  const onChangeHandler = (e) => {
    setColumnName(e.target.value);
  };

  const addColumnToDatabase = () => {
    firebase.database().ref(`/${mainNode}/${firstChildNode}`).push({
      columnName: columnName,
    });
  };
  return (
    <>
      <div className="add_column_popup_main_container">
        <div className="add_column_inner_container">
          <input
            type="text"
            placeholder="Add column"
            name="popUpButton"
            onChange={(e) => {
              onChangeHandler(e);
            }}
          />

          <input
            name="popUpAddButton"
            type="button"
            value="Add Column"
            onClick={() => {
              addColumnToDatabase();
            }}
          />
          <input
            type="button"
            value="X"
            onClick={() => {
              clickHandler();
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Column;
/*

<BrowserRouter>
        <div className="router_container_main_heading">
          <div className="router_container_text">pro-Orginzer</div>
          <div className="router_container_links">
            <Link to="/">
              <button className="router_container_home_link">Home</button>
            </Link>
            <Link to="/createboard">
              <button className="router_container_board_link">
                createboard
              </button>
            </Link>
          </div>
        </div>

        <Switch>
          <Route exact path="/" component={() => <Homepage myd={props.id} />} />
          <mycontext.Provider value={props.id}>
            <Route exact path="/createboard" component={createboard} />
            <Route path="/:name/:uid" component={Mainboard} />
          </mycontext.Provider>
        </Switch>
      </BrowserRouter>
*/
