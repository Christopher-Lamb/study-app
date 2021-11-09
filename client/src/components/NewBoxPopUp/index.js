import React, { useState } from "react";

import NewBoxPopUpCSS from "./NewBoxPopUp.module.css";

export default function NewBoxPopUp({ onExitPopUp, onCreate }) {
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
    <div className={NewBoxPopUpCSS.container}>
      <button className={NewBoxPopUpCSS.popupExit} onClick={onExitPopUp}>
        X
      </button>
      <input
        onChange={(e) => {
          handledChange(e);
        }}
        placeholder="Title"
      ></input>
      <button
        className={NewBoxPopUpCSS.createBtn}
        onClick={() => {
          addToDB();
          onCreate();
        }}
      >
        <p>Create New Box</p>
      </button>
    </div>
  );
}
