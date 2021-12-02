import React, { useState } from "react";
import addTextCSS from "./addText.module.css";
import { returnUniqueNum } from "../../hooks/dbFunctions";

export default function AddText({
  boxId,
  handleSave,
  contentType,
  text,
  closeBtn,
}) {
  const [textarea, setTextareaState] = useState(text);


  const handleInput = (event) => {
    const target = event.target;
    const value = target.value;
    setTextareaState(value);
  };

  //Take text area and add to contents array
  const updateDB = () => {
    //Get INformation from db
    const information = JSON.parse(localStorage.getItem("information"));
    console.log("information", information);
    //Finds the note we are looking for then checks what type we are adding
    const updatedArray = information.map((box) => {
      //If the current box we are in matches the current box in loop
      if (box.id === boxId) {
        //Build Id of notes
        const noteIdArray = box.content.map((note) => {
          return note.id;
        });
        console.log("noteIdArray: ", noteIdArray);

        const id = returnUniqueNum(noteIdArray, 1000);
        
        //pass child to parent 
        handleSave([textarea, id]);

        if (contentType === "heading") {
          box.content.push({ id: id, header: textarea });
        } else if (contentType === "text") {
          box.content.push({ id: id, text: textarea });
        }
      }

      return box;
    });

    localStorage.setItem("information", JSON.stringify(updatedArray));
  };

  //Click
  const handleClick = () => {
    updateDB();
  };
  return (
    <div className={addTextCSS.container}>
      <textarea
        defaultValue={textarea}
        onChange={(e) => {
          handleInput(e);
        }}
      ></textarea>
      <button onClick={handleClick} className={addTextCSS.btn}>
        Save
      </button>
      <button onClick={closeBtn} className={addTextCSS.btn}>
        X
      </button>
    </div>
  );
}
