import React, { useEffect, useState } from "react";
import BoxItemCSS from "../BoxItem/BoxItem.module.css";
import ContentSelector from "../ContentSelector";
// import AddHeader from "../addHeader";
import AddText from "../AddText";
import NoteText from "../NoteText";

export default function BoxItem({ info }) {
  const [classList, setClassList] = useState(`${BoxItemCSS.storageBox}`);
  const [isOpen, setIsOpen] = useState(false);
  const [contentState, setContentState] = useState(info);
  const [newComponent, setNewComponentState] = useState();
  const [workingContentArray, setWorkingContentArray] = useState([]);
  // if (info.content) {
  //   console.log(info);
  // }

  useEffect(() => {
    noteTextBuilder();
  }, [contentState]);
  //Handles Open for Box clicked
  const handleClick = () => {
    //If box is able to be opened and is closed
    if (!isOpen) {
      setClassList(`${BoxItemCSS.storageBox} ${BoxItemCSS.storageBoxOpen}`);
      setIsOpen(true);
      noteTextBuilder();
    }
    //If box is able to be opened and is open
  };

  const handleExit = () => {
    if (isOpen) {
      setClassList(`${BoxItemCSS.storageBox} `);
      setIsOpen(false);
    }
  };

  //On Submit of new Header Element
  const handleHeaderBtn = () => {
    setNewComponentState(
      <AddText
        contentType={"heading"}
        boxId={info.id}
        handleSave={(noteInfo) => {
          const newContentArray = contentState.content;
          newContentArray.push({
            id: noteInfo[1],
            header: noteInfo[0],
          });
          setContentState((state) => ({
            ...state,
            content: newContentArray,
          }));
          handleSelectorCancel();
        }}
      />
    );
  };

  //On Submit of new Text element
  const handleTextBtn = () => {
    setNewComponentState(
      <AddText
        contentType={"text"}
        boxId={info.id}
        handleSave={(noteInfo) => {
          // console.log("Save btn start");
          // console.log("noteInfo", noteInfo);
          // console.log("Content State", contentState.content);

          const newContentArray = contentState.content;
          newContentArray.push({
            id: noteInfo[1],
            text: noteInfo[0],
          });
          setContentState((state) => ({
            ...state,
            content: newContentArray,
          }));
          // setWorkingContentArray((prevState) => [
          //   ...prevState,
          //   <NoteText
          //     id={`box-${info.id}-note-${noteInfo[1]}`}
          //     key={noteInfo[1]}
          //     contentType={"text"}
          //     content={[noteInfo[0], info.id, noteInfo[1]]}
          //     unRender={deleteFromArray}
          //   />,
          // ]);
          handleSelectorCancel();
          console.log("Save btn End");
        }}
      />
    );
  };

  const handleSelectorCancel = () => {
    setNewComponentState(null);
  };

  const noteTextBuilder = () => {
    //please fix key issue by issuing an id or something
    //Init notes from db

    if (contentState.content) {
      const noteTextItems = contentState.content.map((note) => {
        if (note.header) {
          return (
            <NoteText
              id={`box-${info.id}-note-${note.id}`}
              key={note.id}
              contentType={"heading"}
              content={[note.header, info.id, note.id]}
              unRender={deleteFromArray}
            />
          );
        } else if (note.text) {
          return (
            <NoteText
              id={`box-${info.id}-note-${note.id}`}
              key={note.id}
              contentType={"text"}
              content={[note.text, info.id, note.id]}
              unRender={deleteFromArray}
            />
          );
        }
      });
      setWorkingContentArray(noteTextItems);
    }
  };

  const deleteFromArray = (deleteId) => {
    //When a note hits a delete button loop through content array and remove that note

    const newContentArray = contentState.content.filter((note) => {
      console.log(note.id);
      if (note.id === deleteId) {
        return;
      } else {
        return note;
      }
    });
    //This updates the content state array with new and old information
    setContentState((state) => ({
      ...state,
      content: newContentArray,
    }));
  };

  //User Create Box item
  return (
    <div onClick={handleClick} className={classList}>
      {!isOpen && <h1>{contentState.title}</h1>}
      {isOpen && (
        <>
          <button onClick={handleExit}>X</button>
          <NoteText
            key="title"
            contentType="title"
            content={[contentState.title, info.id]}
          />
          {contentState.content ? (
            <div className={BoxItemCSS.contentContainer}>
              {workingContentArray}
              {isOpen && (
                <ContentSelector
                  createHeader={handleHeaderBtn}
                  createText={handleTextBtn}
                  cancelBtn={handleSelectorCancel}
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
