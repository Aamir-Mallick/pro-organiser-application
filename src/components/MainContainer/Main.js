import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Homepage from "../home/Homepage";
import Createformpage from "../createformpage/Createformpage";
import Mainboard from "../mainboard/Mainboard";

import "./MainStyle.css";

function Main(props) {
  return (
    <>
      <BrowserRouter>
        <div className="nav_bar">
          <div className="logo_item">Pro-organizer</div>
          <div className="button_group">
            <NavLink to="/">
              <input type="button" name="home" value="Home" />
            </NavLink>
            <NavLink to="/createboard">
              <input type="button" name="createBoard" value="Create Board" />
            </NavLink>
          </div>
        </div>

        <Switch>
          <Route
            exact
            path="/"
            component={() => {
              return <Homepage id={props.id} />;
            }}
          />

          <Route
            exact
            path="/:name/:uid"
            component={() => {
              return <Mainboard id={props.id} />;
            }}
          />
          <Route
            exact
            path="/createboard"
            component={() => {
              return <Createformpage id={props.id} />;
            }}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default Main;
