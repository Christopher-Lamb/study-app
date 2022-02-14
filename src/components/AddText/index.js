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
    const storageBoxes = JSON.parse(localStorage.getItem("StorageBoxes"));
    // console.log("StorageBoxes", storageBoxes);
    //Finds the note we are looking for then checks what type we are adding
    const updatedArray = storageBoxes.map((box) => {
      //If the current box we are in matches the current box in loop
      if (box.boxId === boxId) {
        //Build Id of notes
        const noteIdArray = box.content.map((note) => {
          return note.noteId;
        });
        // console.log("noteIdArray: ", noteIdArray);

        const id = returnUniqueNum(noteIdArray);
        
        //pass child to parent \[textarea, id]
        //
        handleSave({"noteId":id,"text":textarea});

        if (contentType === "heading") {
          box.content.push({ noteId: id, header: textarea });
        } else if (contentType === "text") {
          box.content.push({ noteId: id, text: textarea });
        }
      }

      return box;
    });

    localStorage.setItem("StorageBoxes", JSON.stringify(updatedArray));
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
