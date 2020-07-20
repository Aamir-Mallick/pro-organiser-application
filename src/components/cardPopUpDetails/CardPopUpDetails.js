import React from "react";
import "./cardPopUpDetailsStyle.css";

function CardPopUpDetails(props) {
  const popUpHandler = () => {
    props.closePopUp();
  };
  return (
    <div
      className="cardDetailsPopUp_main_container"
      onClick={() => {
        popUpHandler();
      }}
    >
      <div className="cardDetailsPopUp_inner_container">
        <div>
          <h2>Card Details</h2>
          <p>{props.cardData.task}</p>
          <p>{props.cardData.description}</p>
          <p>{props.cardData.member}</p>
        </div>
      </div>
    </div>
  );
}

export default CardPopUpDetails;
