import React, { useState, useRef, useEffect } from "react";
import CSS from "./addText.module.css";
import { returnUniqueNum } from "../../hooks/dbFunctions";

export default function AddText({
  boxId,
  handleSave,
  contentType,
  text,
  closeBtn,
}) {
  const [textarea, setTextareaState] = useState(text);
  const [editorClass, setEditorClass] = useState(text);
  const textAreaRef = useRef();

  useEffect(() => {
    //Init Header or Text for note box

    if (contentType === "text") {
      setEditorClass(CSS.editingTextarea);
    } else if (contentType === "heading" || contentType === "title") {
      setEditorClass(CSS.editingHeading);
    }
  }, []);

  //Take text area and add to contents array
  const updateDB = () => {
    //Get INformation from db
    const storageBoxes = JSON.parse(localStorage.getItem("StorageBoxes"));
    //
    //Finds the note we are looking for then checks what type we are adding
    const updatedArray = storageBoxes.map((box) => {
      //If the current box we are in matches the current box in loop
      if (box.boxId === boxId) {
        //Build Id of notes
        const noteIdArray = box.content.map((note) => {
          return note.noteId;
        });
        //

        const id = returnUniqueNum(noteIdArray);

        //pass child to parent \[textarea, id]
        //

        handleSave({ noteId: id, text: textarea });

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
    <div className={CSS.container}>
      <div
        ref={textAreaRef}
        contentEditable={true}
        suppressContentEditableWarning={true}
        className={`${editorClass}`}
        onInput={() => {
          setTextareaState(textAreaRef.current.innerText);
        }}
      ></div>
      <button onClick={handleClick} className={CSS.btn}>
        Save
      </button>
    </div>
  );
}
