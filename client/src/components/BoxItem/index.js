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
  const [newComponent, setNewComponentState] = useState();
  const [workingContentArray, setWorkingContentArray] = useState([]);

  useEffect(() => {
    noteTextBuilder();
  }, []);
  //Handles Open for Box clicked
  const handleClick = () => {
    //If box is closed Open It
    if (isOpen) return;

    setClassList(`${BoxItemCSS.storageBox} ${BoxItemCSS.storageBoxOpen}`);
    setIsOpen(true);
    noteTextBuilder();

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

    console.log(boxState);
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
    noteTextBuilder();
  };
  //On Submit of new Header Element from the Content Selector Component
  const handleHeadingBtn = async () => {
    await handleSelectorCancel();
    await setNewComponentState(
      <AddText
        contentType={"heading"}
        boxId={content.boxId}
        handleSave={(newNoteContent) => {
          let text = "";
          if (newNoteContent.text === undefined) {
            text = "";
          } else {
            text = newNoteContent.text;
          }
          const newContentArray = boxState.notes;
          newContentArray.push({
            noteId: newNoteContent.noteId,
            header: text,
          });
          setBoxState((state) => ({
            ...state,
            content: newContentArray,
          }));
          handleSelectorCancel();
        }}
      />
    );
  };

  const handleSelectorCancel = () => {
    setNewComponentState(null);
  };

  //
  const noteTextBuilder = () => {
    if (boxState.notes) {
      const notes = boxState.notes.map((note) => {
        return (
          <NoteText
            key={note.noteId}
            note={{
              type: note.type,
              text: note.text,
              boxId: boxState.boxId,
              noteId: note.noteId,
            }}
            unRender={deleteFromArray}
          />
        );
      });

      setWorkingContentArray(notes);
    }
  };

  const deleteFromArray = (deleteId) => {
    //When a note hits a delete button loop through content array and remove that note

    const newContentArray = boxState.content.filter((note) => {
      if (note.noteId === deleteId) {
        return;
      } else {
        return note;
      }
    });
    //This updates the content state array with new and old information
    setBoxState((state) => ({
      ...state,
      content: newContentArray,
    }));
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
            {workingContentArray}
            {isOpen && (
              <ContentSelector
                onSelected={handleSelector}
                onCancel={handleSelectorCancel}
                box={boxState.boxId}
                onSave={handleSave}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
