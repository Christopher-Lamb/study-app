import React, { useEffect, useState } from "react";
import BoxItemCSS from "../BoxItem/BoxItem.module.css";
import ContentSelector from "../ContentSelector";
// import AddHeader from "../addHeader";
import AddText from "../AddText";
import NoteText from "../NoteText";
// import BoxItemCSS from "./BoxItem.module.css";

//Should be Named NoteBox Or something NEEDS CHANGE
export default function BoxItem({ info }) {
  const [classList, setClassList] = useState(`${BoxItemCSS.storageBox}`);
  const [isOpen, setIsOpen] = useState(false);
  const [contentState] = useState(info);
  const [newComponent, setNewComponentState] = useState();
  const [workingContentArray, setWorkingContentArray] = useState([]);
  // if (info.content) {
  //   console.log(info);
  // }

  useEffect(() => {
    noteTextBuilder();
  }, []);
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
          setWorkingContentArray((prevState, i) => [
            ...prevState,
            <NoteText
              key={noteInfo[1]}
              contentType={"heading"}
              content={[noteInfo[0], info.id, noteInfo[1]]}
            />,
          ]);
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
          console.log("noteInfo", noteInfo);
          setWorkingContentArray((prevState) => [
            ...prevState,
            <NoteText
              key={noteInfo[1]}
              contentType={"text"}
              content={[noteInfo[0], info.id, noteInfo[1]]}
            />,
          ]);
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
              key={note.id}
              contentType={"heading"}
              content={[note.header, info.id, note.id]}
            />
          );
        } else if (note.text) {
          return (
            <NoteText
              key={note.id}
              contentType={"text"}
              content={[note.text, info.id, note.id]}
            />
          );
        }
      });
      setWorkingContentArray(noteTextItems);
    }
  };

  //User Create Box item
  return (
    <div onClick={handleClick} className={classList}>
      <h2>{contentState.title}</h2>
      {isOpen && (
        <>
          <button onClick={handleExit}>X</button>
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
