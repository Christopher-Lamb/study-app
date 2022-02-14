import React, { useEffect, useRef, useState } from "react";
import NoteTextCSS from "./NoteText.module.css";

export default function NoteText({ content, contentType, unRender }) {
  const [elementState, setElementState] = useState(contentType);
  const [textState, setTextState] = useState(content.text);
  const [editIsActive, setEditIsActive] = useState(false);
  const [editingText, setEditingText] = useState(content.text);
  let editorClass = useRef();

  useEffect(() => {
    //Init Header or Text for note box

    if (contentType === "text") {
      editorClass.current = NoteTextCSS.editingTextarea;
    } else if (contentType === "heading" || contentType === "title") {
      editorClass.current = NoteTextCSS.editingHeading;
    }
  }, []);

  // // Sets note Type
  // const setNote = () => {
  //   if (contentType === "heading") {
  //     setElementState("hTag");
  //   } else if (contentType === "text") {
  //     setElementState("pTag");
  //   } else if (contentType === "title") {
  //     setElementState("title");
  //   }
  // };

  const contentChecker = () => {
    //switch statement would work better i think
    if (elementState === "editor") {
      return;
    } else if (elementState === "heading") {
      return hTag;
    } else if (elementState === "text") {
      return pTag();
    } else if (elementState === "title") {
      return title;
    }
  };

  //
  const handleSave = (updatedText) => {
    setTextState(updatedText);

    //Get INformation from db
    const storageBoxes = JSON.parse(localStorage.getItem("StorageBoxes"));

    //Finds the note we are looking for then checks what type we are adding
    const updatedArray = storageBoxes.map((box) => {
      //If the current box we are in matches the current box in loop
      if (box.boxId === content.boxId) {
        //If its the title element
        if (contentType === "title") {
          //change title to what was edited
          box.title = updatedText;
          console.log("box", box);
          //return box to the array
          return box;
        } else {
          const updatedNotes = box.content.map((note) => {
            if (note.noteId === content.noteId) {
              if (contentType === "heading") {
                return { noteId: content.noteId, header: updatedText };
              } else if (contentType === "text") {
                return { noteId: content.noteId, text: updatedText };
              }
            } else {
              return note;
            }
          });
          box.content = updatedNotes;
        }
        //Build Id of notes
      }
      return box;
    });

    localStorage.setItem("StorageBoxes", JSON.stringify(updatedArray));

    // setElementState(<p>{updatedText}</p>);
  };

  const editingTextUpdater = (text) => {
    setEditingText(text);
  };

  // Handle Item Click For Editing a box
  const handleClick = () => {
    setEditIsActive(true);
  };

  const pTag = () => {
    // console.log(content.noteId)
    let array = textState.split("\n");

    const elementLayout = array.map((element, i) => {
      return (
        <p className={NoteTextCSS.pTag} key={i}>
          {element}
        </p>
      );
    });
    return <div className={NoteTextCSS.pTagContainer}>{elementLayout}</div>;
    return <p className={NoteTextCSS.text}> {textState}</p>;
  };
  const hTag = <h2 className={NoteTextCSS.headingTag}>{textState}</h2>;

  const title = <h1 className={NoteTextCSS.title}>{textState}</h1>;

  const handleDelete = () => {
    //Definitaly not dry but you get the point ok
    //Get INformation from db
    const storageBoxes = JSON.parse(localStorage.getItem("StorageBoxes"));

    //Finds the note we are looking for then checks what type we are adding
    const updatedArray = storageBoxes.map((box) => {
      //If the current box we are in matches the current box in loop

      if (box.id === content.boxId) {
        //If its the title element

        const updatedNotes = box.content.filter((note) => {
          if (note.noteId === content.noteId) {
            return;
          } else {
            return note;
          }
        });
        box.content = updatedNotes;

        //Build Id of notes
      }
      return box;
    });

    localStorage.setItem("StorageBoxes", JSON.stringify(updatedArray));
    unRender(content.noteId);
  };

  return (
    <>
      <div onClick={handleClick} className={NoteTextCSS.container}>
        {!editIsActive && contentChecker()}
        {editIsActive && (
          <>
            <p>Editing</p>
            <textarea
              // onClick={(e) => handleClick(e)}
              id={`note-${content.noteId}`}
              style={{ height: "100%", transition: "1s ease-in-out" }}
              className={`${editorClass.current}`}
              onChange={(e) => {
                editingTextUpdater(e.target.value);
                e.target.style.height = null;
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              defaultValue={textState}
            ></textarea>
            <br />
            <button
              className={NoteTextCSS.btn}
              onClick={(e) => {
                e.stopPropagation();
                if (editingText !== textState) {
                  let answer = window.confirm(
                    "You didnt save are you sure you want to close the editor without saving??"
                  );
                  if (answer) {
                    setEditIsActive(false);
                    setEditingText(textState);
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
            {contentType !== "title" && (
              <button onClick={handleDelete} className={NoteTextCSS.btn}>
                Delete
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}
