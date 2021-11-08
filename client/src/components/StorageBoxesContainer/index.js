import React, { useState } from "react";
import InfoStorageBox from "../InfoStorageBox";
import AddStorageBoxBtn from "../AddStorageBoxBtn";
import AddStorageBoxPopUp from "../AddStorageBoxPopUp";
import "./StorageBoxesContainer.css";

export default function StorageBoxesContainer({ infoBoxes }) {
  const [renderAddNewPopUp, setRenderAddNewPopUp] = useState(false);
  // const addStorageBoxToContainer
  const handleAddStorageBtnClick = () => {
    setRenderAddNewPopUp(true);
  };

  const handleExitPopUp = () => {
    setRenderAddNewPopUp(false);
  };

  return (
    <div className="storage-boxes-container">
      <a onClick={handleAddStorageBtnClick}>
        <AddStorageBoxBtn />
      </a>
      {renderAddNewPopUp && (
        <AddStorageBoxPopUp onExitPopUp={handleExitPopUp} />
      )}
      {/*This will be a state trigger ^^^*/}
      {infoBoxes.map((infoBox) => {
        return (
          <InfoStorageBox
            header={infoBox.header}
            text={infoBox.text}
            key={infoBox.id}
          />
        );
      })}
    </div>
  );
}
