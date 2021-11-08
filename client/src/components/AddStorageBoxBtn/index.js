import React from "react";
import "./AddStorageBoxBtn.css";

export default function AddStorageBoxBtn() {
  //This Component will allow a user to add a new StorageBox to a db

  //OnClick Create New Btn
  //Funct
  const onClick = () => {
    //Present Popup of addStorageBoxPopUp
    prompt("hey");
  };

  
  //pop up bubble
  //Ask for title/subject

  return (
    <a onClick={onClick}>
      <div className="add-storage-box-btn">
        <div className="plus">
          <div className="plus-vertical-line"></div>
          <div className="plus-horizontal-line"></div>
        </div>
      </div>
    </a>
  );
}
