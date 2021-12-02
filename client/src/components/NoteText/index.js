import React, { useEffect, useState } from "react";
import NoteTextCSS from "./NoteText.module.css";

export default function NoteText({ content, contentType }) {
  const [elementState, setElementState] = useState();
  const [textState, setTextState] = useState(content[0]);
  const [editIsActive, setEditIsActive] = useState(false);
  const [editingText, setEditingText] = useState(content[0]);

  useEffect(() => {
    //Init Header or Text for note box
    setNote();
  }, []);

  useEffect(() => {}, [editIsActive]);

  const setNote = () => {
    if (contentType === "heading") {
      setElementState("hTag");
    } else if (contentType === "text") {
      setElementState("pTag");
    }
  };

  const handleSave = (updatedText) => {
    setTextState(updatedText);
    //Get INformation from db
    const information = JSON.parse(localStorage.getItem("information"));
    console.log("information", information);
    //Finds the note we are looking for then checks what type we are adding
    const updatedArray = information.map((box) => {
      //If the current box we are in matches the current box in loop
      if (box.id === content[1]) {
        //Build Id of notes
        const updatedNotes = box.content.map((note) => {
          if (note.id === content[2]) {
            if (contentType === "heading") {
              return { id: content[2], header: textState };
            } else if (contentType === "text") {
              return { id: content[2], text: textState };
            }
          } else {
            return note;
          }
        });
        console.log("updatedNotes: ", updatedNotes);
        box.content = updatedNotes;
        console.log(updatedNotes);
        return box;
      }
    });

    localStorage.setItem("information", JSON.stringify(updatedArray));

    // setElementState(<p>{updatedText}</p>);
  };

  // const handleCancel = () => {
  //   setEditIsActive(false);
  // };

  const editingTextUpdater = (text) => {
    setEditingText(text);
  };

  // Handle Item Click For Editing a box
  const handleClick = () => {
    setEditIsActive(true);
  };

  const pTag = () => {
    let array = textState.split("\n");
    console.log(array);
    const elementLayout = array.map((element, i) => {
      return <p key={i}>{element}</p>;
    });
    return <div className={NoteTextCSS.pTagContainer}>{elementLayout}</div>;
    // return <p className={NoteTextCSS.text}> {textState}</p>;
  };
  const hTag = <h1 className={NoteTextCSS.heading}>{textState}</h1>;

  const editor = (
    <>
      <p>Editing</p>
      <textarea
        // onClick={(e) => handleClick(e)}
        width="100%"
        height="auto"
        className={NoteTextCSS.editingTextarea}
        suppressContentEditableWarning={true}
        contentEditable={true}
        onChange={(e) => {
          editingTextUpdater(e.target.value);
        }}
        defaultValue={textState}
        onClick={() => {}}
      ></textarea>
      <br />
    </>
  );

  const contentChecker = () => {
    if (elementState === "editor") {
      return editor;
    } else if (elementState === "hTag") {
      return hTag;
    } else if (elementState === "pTag") {
      return pTag();
    }
  };

  return (
    <>
      <div onClick={handleClick} className={NoteTextCSS.container}>
        {editIsActive ? editor : contentChecker()}
        {editIsActive && (
          <>
            <br />
            <button
              className={NoteTextCSS.btn}
              onClick={(e) => {
                e.stopPropagation();
                if (editingText !== textState) {
                  let answer = window.confirm(
                    "You didnt save are you sure you want to close the editor??"
                  );
                  if (answer) {
                    setEditIsActive(false);
                  } else {
                    setEditIsActive(true);
                  }
                } else {
                  setEditIsActive(false);
                }
              }}
            >
              Close Editor
            </button>
            <button
              className={NoteTextCSS.btn}
              onClick={(e) => {
                e.stopPropagation();
                handleSave(editingText);
              }}
            >
              Save
            </button>
          </>
        )}
      </div>
    </>
  );
}
