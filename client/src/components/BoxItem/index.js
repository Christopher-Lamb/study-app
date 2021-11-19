import React, { useEffect, useState } from "react";
import BoxItemCSS from "../BoxItem/BoxItem.module.css";
import ContentSelector from "../ContentSelector";
import AddHeader from "../addHeader";
import AddText from "../addText";
import NoteText from "../NoteText";
// import BoxItemCSS from "./BoxItem.module.css";

//Should be Named NoteBox Or something NEEDS CHANGE
export default function BoxItem({ info }) {
  const [classList, setClassList] = useState(`${BoxItemCSS.storageBox}`);
  const [isOpen, setIsOpen] = useState(false);
  const [contentState, setContentState] = useState({});
  const [newComponent, setNewComponentState] = useState();
  const [workingContentArray, setWorkingContentArray] = useState([]);

  useEffect(() => {
    setContentState(info);
  }, [[], info]);
  //Handles Open for Box clicked
  const handleClick = () => {
    //If box is able to be opened and is closed
    if (!isOpen) {
      setClassList(`${BoxItemCSS.storageBox} ${BoxItemCSS.storageBoxOpen}`);
      setIsOpen(true);
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
      <AddHeader
        boxId={info.id}
        handleSave={(text) => {
          setWorkingContentArray((prevState) => [
            ...prevState,
            <NoteText elementType={"header"} text={text} />,
          ]);
        }}
      />
    );
  };

  //On Submit of new Text element
  const handleTextBtn = () => {
    setNewComponentState(
      <AddText
        boxId={info.id}
        handleSave={(text) => {
          setWorkingContentArray((prevState) => [
            ...prevState,
            <NoteText elementType={"text"} text={text} />,
          ]);
        }}
      />
    );
  };

  const handleSelectorCancel = () => {
    setNewComponentState(null);
  };

  //User Create Box item
  return (
    <>
      <div onClick={handleClick} className={classList}>
        {isOpen && <button onClick={handleExit}>X</button>}
        <h2>{contentState.title}</h2>{" "}
        {contentState.content ? (
          <div className={BoxItemCSS.contentContainer}>
            {contentState.content.map((item) => {
              if (item.header) {
                return <NoteText elementType={"header"} text={item.header} />;
              } else if (item.text) {
                return <NoteText elementType={"text"} text={item.text} />;
              }
            })}
            {workingContentArray}{" "}
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
        {/* <button>Edit</button> */}
      </div>
    </>
  );
}
