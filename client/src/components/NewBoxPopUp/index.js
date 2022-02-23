import React, { useState } from "react";
import CSS from "./NewBoxPopUp.module.css";
import storageFunct from "../../utils/localStorageFunct";

export default function NewBoxPopUp({ onExitPopUp, onCreate }) {
  const [title, setTitle] = useState("");
  //Update State
  const handledChange = (event) => {
    const target = event.target;
    const value = target.value;
    setTitle(value);
  };

  const addToDB = () => {
    storageFunct.addBox(title);
    onCreate();
  };

  return (
    <div className={CSS.screen}>
      <div className={CSS.container}>
        <button className={CSS.popupExit} onClick={onExitPopUp}>
          X
        </button>
        <input
          onChange={(e) => {
            handledChange(e);
          }}
          placeholder="Title"
        ></input>
        <button
          className={CSS.createBtn}
          onClick={addToDB}
        >
          <p>Create New Box</p>
        </button>
      </div>
    </div>
  );
}
