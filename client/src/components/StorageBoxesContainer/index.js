import React from "react";
import InfoStorageBox from "../InfoStorageBox";
import AddStorageBoxBtn from "../AddStorageBoxBtn";
import "./StorageBoxesContainer.css";

export default function StorageBoxesContainer({ infoBoxes }) {
  return (
    <div className="storage-boxes-container">
      <AddStorageBoxBtn />
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
