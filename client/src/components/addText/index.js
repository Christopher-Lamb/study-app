import React, { useState } from "react";
import addTextCSS from "./addText.module.css";

export default function AddText({ boxId, handleSave }) {
  const [textarea, setTextareaState] = useState("");

  const handleInput = (event) => {
    const target = event.target;
    const value = target.value;
    setTextareaState(value);
  };

  const handleClick = () => {
    updateDB();
    handleSave(textarea);
  };

  //Take text area and add to contents array
  const updateDB = () => {
    const information = JSON.parse(localStorage.getItem("information"));
    console.log(information);
    const updatedArray = information.map((element) => {
      if (element.id === boxId) {
        element.content.push({ text: textarea });
      }
      return element;
    });
    localStorage.setItem("information", JSON.stringify(updatedArray));
  };

  return (
    <div className={addTextCSS.container}>
      <textarea
        onChange={(e) => {
          handleInput(e);
        }}
      ></textarea>
      <button onClick={handleClick} className={addTextCSS.btn}>
        Save
      </button>
    </div>
  );
}
