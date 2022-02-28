import React, { useEffect, useRef, useState } from "react";
import BoxItemCSS from "../BoxItem/BoxItem.module.css";
import ContentSelector from "../ContentSelector";
import AddText from "../AddText";
import NoteText from "../NoteText";
import ThreeDotsMenu from "../ThreeDotsMenu";
import BoxTitle from "../BoxTitle";
import storageFunct from "../../utils/localStorageFunct";

// Single Stored Box that contains a collection of
//info consists of the Text Headings and Title of each Box Stored
export default function BoxItem({ content, deleteBox }) {
  const [classList, setClassList] = useState(`${BoxItemCSS.storageBox}`);
  const [isOpen, setIsOpen] = useState(false);
  const [boxState, setBoxState] = useState(content);

  // useEffect(() => {
  //   noteTextBuilder();
  // }, []);
  //Handles Open for Box clicked
  const handleClick = () => {
    //If box is closed Open It
    if (isOpen) return;
    setClassList(`${BoxItemCSS.storageBox} ${BoxItemCSS.storageBoxOpen}`);
    setIsOpen(true);
    //If box is able to be opened and is open
  };

  const handleExit = () => {
    if (isOpen) {
      setClassList(`${BoxItemCSS.storageBox} `);
      setIsOpen(false);
    }
  };

  const handleSave = (newNote) => {
    const newId = storageFunct.addNote(
      newNote.type,
      newNote.text,
      content.boxId
    );

    boxState;
    const newContentArray = boxState.notes;
    newContentArray.push({
      noteId: newId,
      type: newNote.type,
      text: newNote.text,
    });
    setBoxState((state) => ({
      ...state,
      notes: newContentArray,
    }));
  };

  //
  const noteTextBuilder = () => {
    let notes = [];
    if (boxState.notes) {
      notes = boxState.notes.map((note) => {
        return (
          <NoteText
            key={note.noteId}
            note={{
              type: note.type,
              text: note.text,
              boxId: boxState.boxId,
              noteId: note.noteId,
            }}
            onDel={deleteNote}
          />
        );
      });
    }
    return notes;
  };

  const deleteNote = (deleteId) => {
    //When a note hits a delete button loop through content array and remove that note

    storageFunct.delNote(content.boxId, deleteId);
    const newContentArray = boxState.notes.filter((note) => {
      if (note.noteId === deleteId) {
        return;
      } else {
        return note;
      }
    });
    //This updates the notes state array with new and old information
    setBoxState((state) => ({
      ...state,
      notes: newContentArray,
    }));
    // setBoxState({ notes: newContentArray });
  };
  const updateTitle = (newTitle) => {
    setBoxState((prevState) => {
      return { ...prevState, title: newTitle };
    });
  };
  const titleRef = useRef();
  //User Create Box item
  const onHover = () => {
    if (!isOpen) {
      titleRef.current.classList = `${BoxItemCSS.titleHover} ${BoxItemCSS.title}`;
    }
  };
  const onHoverCancel = () => {
    if (!isOpen) {
      titleRef.current.classList = `${BoxItemCSS.title}`;
    }
  };

  const handleSelector = (type) => {
    //Get The Type from content Selector component
    //Then create a note using Add Text components
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={onHover}
      onMouseLeave={onHoverCancel}
      className={classList}
    >
      {!isOpen && (
        <>
          <ThreeDotsMenu
            onDel={() => {
              deleteBox(boxState.boxId);
            }}
          />
          <BoxTitle ref={titleRef} className={BoxItemCSS.title}>
            {boxState.title}
          </BoxTitle>
        </>
      )}
      {isOpen && (
        <>
          <button className={BoxItemCSS.closeBoxBtn} onClick={handleExit}>
            Close
          </button>
          <NoteText
            key="title"
            contentType="title"
            note={{
              type: "title",
              text: boxState.title,
              boxId: boxState.boxId,
              noteId: "title",
            }}
            updateTitle={updateTitle}
          />

          <div className={BoxItemCSS.contentContainer}>
            {noteTextBuilder()}
            {isOpen && (
              <ContentSelector box={boxState.boxId} onSave={handleSave} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
