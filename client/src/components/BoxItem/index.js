import React, { useEffect, useRef, useState } from "react";
import BoxItemCSS from "../BoxItem/BoxItem.module.css";
import ContentSelector from "../ContentSelector";
import AddText from "../AddText";
import NoteText from "../NoteText";
import ThreeDotsMenu from "../ThreeDotsMenu";
import BoxTitle from "../BoxTitle";

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
  }, [boxState]);
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
          const newContentArray = boxState.content;
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

  //On Submit of new Text element
  const handleTextBtn = async () => {
    await handleSelectorCancel();
    await setNewComponentState(
      <AddText
        contentType={"text"}
        boxId={content.boxId}
        handleSave={(newNoteContent) => {
          let text = "";
          if (newNoteContent.text === undefined) {
            text = "";
          } else {
            text = newNoteContent.text;
          }
          const newContentArray = boxState.content;
          newContentArray.push({
            noteId: newNoteContent.noteId,
            text: text,
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
    if (boxState.content) {
      const notes = boxState.content.map((note) => {
        let contentType = "";
        let text = "";
        if (note.header) {
          contentType = "heading";
          text = note.header;
        } else if (note.text) {
          contentType = "text";
          text = note.text;
        }
        return (
          <NoteText
            id={`box-${boxState.boxId}-note-${note.noteId}`}
            key={note.noteId}
            contentType={contentType}
            content={{
              text: text,
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
            content={{ text: boxState.title, boxId: boxState.boxId }}
            updateTitle={updateTitle}
          />
          {boxState.content ? (
            <div className={BoxItemCSS.contentContainer}>
              {workingContentArray}
              {isOpen && (
                <ContentSelector
                  onSelected={handleSelector}
                  onCancel={handleSelectorCancel}
                />
              )}
              {newComponent}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
