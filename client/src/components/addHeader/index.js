import React, { useState } from "react";
import addHeaderCSS from "./addHeader.module.css";

export default function AddHeader({ boxId, onSave, handleSave }) {
  const [input, setInputState] = useState("");

  const handleInput = (event) => {
    const target = event.target;
    const value = target.value;
    setInputState(value);
  };

  const handleClick = () => {
    updateDB();
    handleSave(input);
  };

  //Take text area and add to contents array
  const updateDB = () => {
    const information = JSON.parse(localStorage.getItem("information"));
    console.log(information);
    const updatedArray = information.map((element) => {
      if (element.id === boxId) {
        element.content.push({ header: input });
      }
      return element;
    });
    localStorage.setItem("information", JSON.stringify(updatedArray));
  };

  return (
    <div className={addHeaderCSS.container}>
      <input onChange={handleInput}></input>
      <button onClick={handleClick} className={addHeaderCSS.btn}>
        Save
      </button>
    </div>
  );
}
