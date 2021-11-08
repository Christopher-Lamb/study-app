import React, { useState } from "react";

import "./AddStorageBoxPopUp.css";

export default function AddStorageBoxPopUp({ onExitPopUp }) {
  const [title, setTitle] = useState("");
  //Update State
  const handledChange = (event) => {
    const target = event.target;
    const value = target.value;
    setTitle(value);
  };

  //Read and Edit Json as of Now but in future Google docs and then Mongo or MySQL
  const addToDB = () => {
    const informationString = localStorage.getItem("information");
    const informationParsed = JSON.parse(informationString);

    //Gets the id of last item stored in local Storage -- Temporary --
    const newID = parseInt(informationParsed.slice(-1)[0].id) + 1;
    //New Box/List Item
    const newBox = { id: newID, title: title };
    console.log(informationParsed);
    informationParsed.push(newBox);
    //Send pack to localStorage

    localStorage.setItem("information", JSON.stringify(informationParsed));
  };

  return (
    <div className="add-storage-box-popup">
      <a className="popup-exit" onClick={onExitPopUp}>
        X
      </a>
      <input
        onChange={(e) => {
          handledChange(e);
        }}
        placeholder="Title"
      ></input>
      <a className="popup-create-new-btn" onClick={addToDB}>
        <p>Create New Box</p>
      </a>
    </div>
  );
}
