import React, { useState, useRef, useEffect } from "react";
import CSS from "./addText.module.css";
import storageFunct from "../../utils/localStorageFunct";

//On save You have to send to content selector which then sends to box Item

export default function AddText({ id, onSave, type, closeBtn }) {
  const textAreaRef = useRef();

  useEffect(() => {
    //Init Header or Text for note box
    switch (type) {
      case "text":
        textAreaRef.current.className = CSS.text;
        break;
      case "heading" || "title":
        textAreaRef.current.className = CSS.heading;
        break;
    }
  }, []);

  //Take text area and add to contents array

  //Click
  const handleClick = () => {
    onSave({ type: type, text: textAreaRef.current.innerText });
    console.log(textAreaRef);
    textAreaRef.current.textContent = "";
  };
  return (
    <div className={CSS.container}>
      <div
        ref={textAreaRef}
        contentEditable={true}
        suppressContentEditableWarning={true}
      ></div>
      <button onClick={handleClick} className={CSS.btn}>
        Save
      </button>
    </div>
  );
}
