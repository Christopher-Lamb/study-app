import React, { useEffect, useRef, useState } from "react";
import NoteTextCSS from "./NoteText.module.css";

export default function NoteText({
  content,
  contentType,
  unRender,
  updateTitle,
}) {
  const [elementState, setElementState] = useState(contentType);
  const [textState, setTextState] = useState(content.text);
  const [editorElement, setEditorElement] = useState([]);
  const [editingText, setEditingText] = useState(content.text);
  const [editorHeight, setEditorHeight] = useState();
  let editorClass = useRef();
  const editorRef = useRef();
  const textAreaRef = useRef();
  const textRef = useRef();
  // const currentScrollHeight = useRef(0);

  useEffect(() => {
    //Init Header or Text for note box

    if (contentType === "text") {
      editorClass.current = NoteTextCSS.editingTextarea;
    } else if (contentType === "heading" || contentType === "title") {
      editorClass.current = NoteTextCSS.editingHeading;
    }
    console.log(`${content.text}`);
    // setEditorHeight(textReft);
    editorRef.current.className = NoteTextCSS.hidden;
    buildEditorTxt();
  }, []);

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
          //
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

  // Handle Item Click For Editing a box
  const handleClick = async () => {
    console.log(contentType);
    console.log(textRef);
    editorRef.current.classList = "";

    if (textRef.current !== undefined) {
      textRef.current.className = NoteTextCSS.hidden;
    }
  };

  const pTag = () => {
    console.log(textState);
    let array = textState.split("\n");

    const elementLayout = array.map((element, i) => {
      return (
        <p className={NoteTextCSS.pTag} key={i}>
          {element}
        </p>
      );
    });
    return (
      <div ref={textRef} className={NoteTextCSS.pTagContainer}>
        {elementLayout}
      </div>
    );
    // return <p className={NoteTextCSS.text}> {textState}</p>;
  };
  const hTag = (
    <h2 ref={textRef} className={NoteTextCSS.headingTag}>
      {textState}
    </h2>
  );

  const title = (
    <h1 ref={textRef} className={NoteTextCSS.title}>
      {textState}
    </h1>
  );

  const handleDelete = () => {
    //Definitaly not dry but you get the point ok
    //Get INformation from db
    const storageBoxes = JSON.parse(localStorage.getItem("StorageBoxes"));

    //Finds the note we are looking for then checks what type we are adding
    const updatedArray = storageBoxes.map((box) => {
      //If the current box we are in matches the current box in loop

      if (box.boxId === content.boxId) {
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

  //Formats the editable p tag so it matches the acutal p tags
  const buildEditorTxt = () => {
    setEditorElement(<div key={content.noteId}>{textState}</div>);
  };

  return (
    <>
      <div onClick={handleClick} className={NoteTextCSS.container}>
        {contentChecker()}

        <div ref={editorRef}>
          <p>Editing</p>
          <div
            id={`note-${content.noteId}`}
            ref={textAreaRef}
            contentEditable={true}
            suppressContentEditableWarning={true}
            className={`${editorClass.current}`}
            onInput={() => {
              setEditingText(textAreaRef.current.innerText);
            }}
          >
            {editorElement}
          </div>
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
                  editorRef.current.className = NoteTextCSS.hidden;
                  textRef.current.className = "";
                  setEditingText(textState);
                  setEditorHeight(textRef.current.clientHeight);
                } else {
                }
              } else {
                editorRef.current.className = NoteTextCSS.hidden;
                textRef.current.className = "";
                setEditorHeight(textRef.current.clientHeight);
              }
            }}
          >
            Close Editor
          </button>
          <button
            className={NoteTextCSS.btn}
            onClick={(e) => {
              e.stopPropagation();
              handleSave(textAreaRef.current.innerText);
              if (contentType === "title") {
                updateTitle(editingText);
              }
            }}
          >
            Save
          </button>
          {contentType !== "title" && (
            <button onClick={handleDelete} className={NoteTextCSS.btn}>
              Delete
            </button>
          )}
        </div>
      </div>
    </>
  );
}
