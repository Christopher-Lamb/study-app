import React, { useEffect, useState } from "react";
import InfoStorageBoxCSS from "../InfoStorageBox/InfoStorageBox.module.css";
import ContentSelector from "../ContentSelector";
import AddHeader from "../addHeader";
import AddText from "../addText";
// import BoxItemCSS from "./BoxItem.module.css";

export default function BoxItem({ info }) {
  const [classList, setClassList] = useState(`${InfoStorageBoxCSS.storageBox}`);
  const [isOpen, setIsOpen] = useState(false);
  const [contentState, setContentState] = useState({});
  const [newComponent, setNewComponentState] = useState();

  useEffect(() => {
    setContentState(info);
  }, [[], info]);
  //Handles Open for Box clicked
  const handleClick = () => {
    //If box is able to be opened and is closed
    if (!isOpen) {
      setClassList(
        `${InfoStorageBoxCSS.storageBox} ${InfoStorageBoxCSS.storageBoxOpen}`
      );
      setIsOpen(true);
    }
    //If box is able to be opened and is open
  };

  const handleExit = () => {
    if (isOpen) {
      setClassList(`${InfoStorageBoxCSS.storageBox} `);
      setIsOpen(false);
    }
  };

  const handleHeaderBtn = () => {
    setNewComponentState(<AddHeader />);
  };

  const handleTextBtn = () => {
    setNewComponentState(<AddText />);
  };

  const handleSelectorCancel = () => {
    setNewComponentState(null);
  };

  //User Create Box item
  return (
    <>
      <div onClick={handleClick} className={classList}>
        <button onClick={handleExit}>X</button>
        <ContentSelector
          createHeader={handleHeaderBtn}
          createText={handleTextBtn}
          cancelBtn={handleSelectorCancel}
        />
        <h1>{contentState.id}</h1>
        <h2>{contentState.title}</h2>
        {contentState.content ? (
          <div className={InfoStorageBoxCSS.contentContainer}>
            <p>{contentState.content[0].header}</p>
            <p>{contentState.content[1].text}</p>
            {newComponent}
          </div>
        ) : null}

        {/* <button>Edit</button> */}
      </div>
    </>
  );
}
