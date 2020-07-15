import React from "react";
import Main from "../MainContainer/Main";

function RouteContainer(props) {
  return (
    <>
      <Main id={props.databaseId} />
    </>
  );
}

export default RouteContainer;
